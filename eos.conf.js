const path = require("path");

module.exports = {
    schema: "2.0.0",
    name: "Miniboard",
    version: "2.2.0",
    manifest: path.join(__dirname + "/package.json"),
    dependentFiles: [
        path.join(__dirname + "/src/main.js"),
        path.join(__dirname + "/src/preload.js"),
        path.join(__dirname + "/src/util/createIsolator.js"),
        path.join(__dirname + "/src/static/index.html"),
        path.join(__dirname + "/src/static/js/index.js"),
    ],
    runApp: async function () {
        require(path.join(__dirname + "/src/main.js"));
    }
};