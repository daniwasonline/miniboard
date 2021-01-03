const { contextBridge, ipcRenderer } = require("electron");
const fetch = require("node-fetch");
const child = require("child_process");
const pkgconf = require("./config.json");

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
            },
            openNetflix: async () => {
                child.execFile("sudo chmod 755 ./loadnetflix.sh")
                const netflix = child.execFile("sudo sh ./loadnetflix.sh");
                ipcRenderer.send("hideApp");
                netflix.on("exit", async function () {
                    ipcRenderer.send("showApp");
                });

                netflix.on("message", (afd) => console.log(afd))
            }
        }
    }
);