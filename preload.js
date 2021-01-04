const { contextBridge, ipcRenderer, shell } = require("electron");
const fetch = require("node-fetch");
const child = require("child_process");
const pkgconf = require("./config.json");
const processExists = require("process-exists");
const os = require("os");

contextBridge.exposeInMainWorld(
    "bridge", {
        information: {
            getDate: (gmt) => {
                if (typeof gmt !== "boolean") throw new TypeError("A boolean is required!");
                if (gmt == true) {
                    return new Date().toGMTString()
                } if (gmt == false || gmt == undefined) {
                    return new Date().toString()
                }
            },
            getDateObject: () => {
                return new Date();
            },
            getConfig: () => {
                return pkgconf;
            }
        },

        media: {
            getNewestTrack: async () => {
                const resraw = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${pkgconf.media.lastfm.username}&api_key=${pkgconf.media.lastfm.key}&format=json&limit=1`).then(async res => {
                    const track = await res.json()
                    return track.recenttracks.track[0]
                }).catch(e => { return false; })
                return resraw;
            },
            openNetflix: async () => {
                console.log(os.arch())
                if (os.arch() == "x64" || os.arch() == "x32" || os.arch() == "ia32" || os.platform() == "win32" || os.platform() == "darwin") { 
                    shell.openExternal("https://netflix.com")
                } else if (os.arch() == "arm" && os.platform() == "linux" || os.arch() == "arm64" && os.platform() == "linux") {
                    const netflix = child.execFile("sh", [__dirname + "/src/loadnetflix.sh"]);
                    ipcRenderer.send("hideApp");
                } else {
                    document.getElementById("thanks").innerHTML = "DRM content isn't supported on this system."
                }
            },
            openAppFromNetflix: async () => {
                ipcRenderer.send("showApp");
            }
        }
    }
);