const fs = require("fs");

/**
 * 
 * @param {String} path The application dependency name 
 * @returns Either a process exit, or true
 */
function checkApplicationDepMod(mod) {
    try {
        require.resolve(mod);
        return true;
    } catch (e) {
        console.log(`\nThe application dependent module "${mod}" is not installed. Please run npm install or yarn install, then try again.`);
        return process.exit(2);
    };
};

/**
 * 
 * @param {String} path The path to the configuration 
 * @returns The configuration
 */
function loadConfiguration(path) {
    const conf = require(path);
    return conf;
};

/**
 * 
 * @param {String} path The path to the application dependency 
 * @returns Either a process exit, or true
 */
function checkApplicationDepFile(path) {
    if (!fs.existsSync(path)) {
        console.log(`\nThe application dependent file "${path.split("/")[path.split("/").length - 1]}" does not exist. Please reinstall this app.`);
        return process.exit(2);
    } else {
        return true;
    };
};

module.exports = { checkApplicationDepMod, checkApplicationDepFile, loadConfiguration };