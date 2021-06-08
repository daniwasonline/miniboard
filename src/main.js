/**
 * Name: main.js
 * Created: 8 June 2021 @ 15:20 BST (14:20 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { initLogger, addWhitespace } from "./lib/log";

setTimeout(async function () {
    if (!fs.existsSync(path.join(__dirname + "/mod.d"))) {
        console.log(initLogger("The directory src/mod.d was not found. Please re-install Miniboard, or place the necessary files inside src/mod.d.", "error"));
        process.exit(1);
    };

    if (fs.existsSync(path.join(__dirname + "/mod.d"))) {
        const modDirs = fs.readdirSync(path.join(__dirname, `/mod.d/`), { withFileTypes: true }).filter(ent => ent.isDirectory());
        let modsInt = 0;
        if (modDirs.length == 0) {
            console.log(initLogger(`${chalk.cyan("CORE")} No modules were found in src/mod.d. Please install the necessary core MCR modules to run, or re-install Miniboard.`, "error"));
            process.exit(2);
        };
        if (modDirs.length > 0) {
            console.log(initLogger(`${modDirs.length} modules were found. Loading modules..`, "init"));
            for (const modDirRaw of modDirs) {
                const modsDir = fs.readdirSync(path.join(__dirname, `/mod.d/${modDirRaw.name}`)).filter(ent => ent == "manifest.o");
                for (const fi of modsDir) {
                    const miniboardModule = require(path.join(__dirname + `/mod.d/${modDirRaw.name}/${fi}`)).default;
                    if (miniboardModule.autoLoad !== false) {
                        modsInt++;
                        console.log(initLogger(`${miniboardModule.name} (Module ${modsInt}/${modDirs.length})`, "loading"));
                        try {
                            miniboardModule.runtime();
                            console.log(initLogger(`${miniboardModule.name} (Module ${modsInt}/${modDirs.length})`, "success"));
                        } catch(e) {
                            console.log(initLogger(`${miniboardModule.name} (Module ${modsInt}/${modDirs.length}):\n${chalk.red(e.stack.trim())}`, "error"));
                        };
                    };
                };
            };
        };
    }; 
}, 250);

