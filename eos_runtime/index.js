const fs = require("fs");
const path = require("path");

const eosFunctions = {
    /**
     * Loads a file, and if ESM is enabled, it will be loaded under ESM.
     * @param {FilePath} file The path to the file that should be loaded.
     */
    load: async function (file) {
        if (!process.eosConfiguration.runtimeOptions.esm) {
            require(file);
        } if (process.eosConfiguration.runtimeOptions.esm) {
            process.eosEsmFile = file;
            require(path.join(__dirname + "/lib/esm_loader"));
        };
    }
};

async function runtime() {
    VERSION="2.0.0";

    console.log(`Node.js runtime ${process.version}`);
    console.log(`Eos Core Runtime v${VERSION}`);
    console.log("Finding configuration..")

    console.log("Checking for core libraries and resources..");
    try {
        require(path.join(__dirname + "/lib/module.js"));
        require(path.join(__dirname + "/lib/errors.js"));
    } catch (e) {
        if (!fs.existsSync(path.join(__dirname + "/lib/errors.js"))) {
            console.log(`The Eos Runtime core dependency "/lib/errors.js" does not exist. Please reinstall this app.`);
            return process.exit(1);
        } if (!fs.existsSync(path.join(__dirname + "/lib/module.js"))) {
            console.log(`The Eos Runtime core dependency "/lib/module.js" does not exist. Please reinstall this app.`);
            return process.exit(1);
        };
    };

    const { checkApplicationDepMod, checkApplicationDepFile, loadConfiguration } = require(path.join(__dirname + "/lib/module.js"));

    if (process.eos_conf_path == undefined) {
        console.log(`An Eos runtime configuration path was not found. Checking if ../eos.conf.js exists..`);
        if (!fs.existsSync(path.join(__dirname + "/../eos.conf.js"))) {
            console.log(`An Eos runtime configuration file was not able to be located. Please ask the application maintainer to specify an eos_conf_path configuration path in the startpoint file.`);
            return process.exit(1);
        };
        process.eos_conf_path = __dirname + "/../eos.conf.js";
    };

    const configuration = loadConfiguration(process.eos_conf_path);
    process.eosConfiguration = configuration;


    console.log("\nChecking for core files..");

    var depNum = 0;
    configuration.dependentFiles.forEach(async function (p) {
            let ind;
            if (depNum % 2 == 0) ind = "/";
            else ind = "\\";

            checkApplicationDepFile(p);

            console.log(`Found: ${p.split("/")[p.split("/").length - 1]}`);

            depNum++;
    });

    console.log("\nChecking if the app's dependencies are installed..");

    var modNum = 0;
    const depMods = Object.keys(require(configuration.manifest).dependencies); 
    depMods.forEach(async function (mod) {
            let ind;
            if (depNum % 2 == 0) ind = "/";
            else ind = "\\";

            checkApplicationDepMod(mod);

            console.log(`Found: ${mod.split("/")[mod.split("/").length - 1]}`);

            modNum++;
    });
    process.stdout.write("\nRunning app's initialisation script..\n");
    process.eosRunning = true;
    configuration.runApp(eosFunctions);
};

module.exports = { runtime };