const path = require("path");

module.exports = {
    schema: "2.0.1",
    name: "Lightbox Core Boot-time Loader",
    version: "3.0.0",
    manifest: path.join(__dirname + "/package.json"),
    dependentFiles: [
        path.join(__dirname + "/src/lcbl.o"),
        path.join(__dirname + "/src/preload.js"),
        path.join(__dirname + "/src/lib/")
    ],
    runtimeOptions: {
        esm: true
    },
    runApp: async function (eos) {
        eos.load(path.join(__dirname + "/src/lcbl.o"));
    }
};