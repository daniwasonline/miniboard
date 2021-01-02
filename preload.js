const { contextBridge, app } = require("electron");

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
                const pkgconf = require("./config.json")
                return pkgconf;
            }
        },
    }
);