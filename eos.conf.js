const path = require("path");

module.exports = {
    schema: "2.0.1",
    name: "Miniboard",
    version: "2.2.0",
    manifest: path.join(__dirname + "/package.json"),
    dependentFiles: [
        path.join(__dirname + "/src/main.js"),
        path.join(__dirname + "/src/preload.js")
    ],
    runtimeOptions: {
        esm: true
    },
    runApp: async function (eos) {
        eos.load(path.join(__dirname + "/src/main.js"));
    }
};