const path = require("path");
module.exports = async function (BrowserWindow) { 
    const isolationLoader = new BrowserWindow({ width: 100, height: 100, minWidth: 100, minHeight: 100, frame: true, show: false, webPreferences: {
        nodeIntegration: false,
        enableRemoteModule: false,
        contextIsolation: true,
        webviewTag: false,
        preload: path.join(__dirname + "/../preload.js")
    }});
    return isolationLoader;
};