#!/usr/bin/env node
/**
 * Name: mod.d/lib/import.o
 * Created: 8 June 2021 @ 17:30 BST (16:30 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import path from "path";
import fs from "fs";
import { initLogger } from "../../lib/log";
import chalk from "chalk";

/**
 * Execute another Lightbox module that does not run with auto-run
 * @param {String} modName The name of the module to execute.
 * @returns {Boolean} A boolean that verifies that the module ran.
 */
function importModule(modName) {
    if (!fs.existsSync(path.join(__dirname + `/../${modName}/manifest.o`))) throw new Error("Module does not exist!");
    const m = require(path.join(__dirname + `/../${modName}/manifest.o`)).default;
    if (m.autoRun) throw new Error("Module cannot be imported as it is auto-executed on start up!");
    console.log(initLogger(`${m.name} (${chalk.magenta("Called from module")})`, "loading"));
    try {
        m.runtime();
        console.log(initLogger(`${m.name} (${chalk.magenta("Called from module")})`, "success"));
    } catch (e) {
        console.log(initLogger(`${m.name}:\n${chalk.red(e.stack.trim())}`, "error"));
    };
    return true;
};

export { importModule };