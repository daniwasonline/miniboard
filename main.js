const { app, BrowserWindow, screen, Tray, session, ipcMain } = require("electron");
const { ElectronBlocker } = require("@cliqz/adblocker-electron")
const fetch = require("cross-fetch");
const path = require("path");
app.disableHardwareAcceleration()

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
        window.setFullScreen(false);
    });

    ipcMain.on('showApp', (e) => {
        window.loadFile("./src/index.html");
        window.setFullScreen(true);
    });

    setInterval(async function () {
        window.loadFile("./src/index.html")
    }, 900000);
});

