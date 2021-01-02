const { contextBridge, app } = require("electron");
const fetch = require("node-fetch");
const pkgconf = require("./config.json")

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
                const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${pkgconf.media.lastfm.username}&api_key=${pkgconf.media.lastfm.key}&format=json&limit=1`)
                const track = await res.json()
                return track.recenttracks.track[0]
            }
        }
    }
);