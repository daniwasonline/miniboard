const { app, BrowserWindow, screen, Tray, session, ipcMain } = require("electron");
const { ElectronBlocker } = require("@cliqz/adblocker-electron")
const fetch = require("cross-fetch");
const path = require("path");

app.on("ready", async function () {
    const window = new BrowserWindow({ width: 1680, height: 1050, minWidth: 512, minHeight: 512, frame: true, show: true, webPreferences: {
        nodeIntegration: false,
        enableRemoteModule: false,
        contextIsolation: true,
        webviewTag: true,
        preload: path.join(__dirname + "/preload.js")
    }});

    window.loadFile('./src/index.html');
    window.setFullScreen(true);
    //window.toggleDevTools()
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
    });

    ipcMain.on('hideApp', (e) => {
        window.loadFile("./src/none.html");
        window.setFullScreen(false);
        window.hide();
    });

    ipcMain.on('showApp', (e) => {
        window.show();
        window.loadFile("./src/index.html");
        window.setFullScreen(true);
    });
});

