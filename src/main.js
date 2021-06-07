const { app, BrowserWindow, screen, Tray, session, ipcMain } = require("electron");
const { ElectronBlocker } = require("@cliqz/adblocker-electron");
const createIsolator = require("./util/createIsolator.js");
const fs = require("fs");
const fetch = require("cross-fetch");
const path = require("path");
const chalk = require("chalk");

if (process.eosRunning != true) {
    console.log(chalk.blue("MCR (Miniboard Core Runtime) returned the following error: ") + chalk.red("Miniboard cannot be run directly from the src folder. You must use the main.js file in the root of the Miniboard repository. The file should be located in the directory above this one."));
    return process.exit(1);
}

app.on("ready", async function () {
    const window = new BrowserWindow({ width: 1680, height: 1050, minWidth: 512, minHeight: 512, frame: true, show: true, webPreferences: {
        nodeIntegration: false,
        enableRemoteModule: false,
        contextIsolation: true,
        webviewTag: true,
        preload: path.join(__dirname + "/preload.js")
    }});
    window.loadFile(path.join(__dirname + "/static/index.html"));
    window.setFullScreen(true);
    //window.toggleDevTools()
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
    });

    ipcMain.on('hideApp', (e) => {
        window.setFullScreen(false);
    });

    ipcMain.on('showApp', (e) => {
        window.loadFile(path.join(__dirname + "/static/index.html"));
        window.setFullScreen(true);
    });

    ipcMain.on('exitApp', (e) => {
        app.exit();
    });

    ipcMain.on("notification", async (_, e) => {
        if (typeof e !== "object") return new TypeError("Type of argument e must be Object!");
        window.webContents.executeJavaScript(`window.sendNotification({ title: "${e.title}", description: "${e.description}" })`);
    });

    setInterval(async function () {
        if (window.webContents.getURL().endsWith("index.html")) {
            if (require("../config.json").process_manager == true) {
                app.exit();
            }
        }
    }, 900000);

    // Load external modules if needed
    setTimeout(async function () {
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        console.log ("Module #0 || Module mod.init is being loaded..");
        if (fs.existsSync(path.join(__dirname + "/mod.d"))) {
            const modDirs = fs.readdirSync(path.join(__dirname, `/mod.d/`), { withFileTypes: true }).filter(ent => ent.isDirectory());
            let modsInt = 0;
            if (modDirs.length == 0) console.log("mod.d is empty, not scanning files..")
            if (modDirs.length > 0) {
                console.log("mod.d has loadable modules, creating a new isolated container for confining them..");
                const isolator = await createIsolator(BrowserWindow);
                isolator.config = require(path.join(__dirname + "/../config.json"));
                isolator.loadFile(path.join(__dirname + "/static/isolator.html"));
                for (const modDirRaw of modDirs) {
                    const modsDir = fs.readdirSync(path.join(__dirname, `/mod.d/${modDirRaw.name}`)).filter(ent => ent == "manifest.mod.o");
                    for (const fi of modsDir) {
                        const miniboardModule = require(path.join(__dirname + `/mod.d/${modDirRaw.name}/${fi}`));
                        if (miniboardModule.autoLoad !== false) {
                            modsInt++;
                            try {
                                console.log(`Module #${modsInt} || Module ${miniboardModule.name} is being loaded..`);
                                miniboardModule.run(isolator);
                            } catch (e) {
                                console.log(chalk.blue(`${miniboardModule.name} returned the following error: ${chalk.red(e)}`));
                            };
                        };
                    };
                };
            };
        }; 
    }, 1500);
});

