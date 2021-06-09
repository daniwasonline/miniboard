#!/usr/bin/env node
/**
 * Name: lib/log.js
 * Created: 8 June 2021 @ 15:20 BST (14:20 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import installPkg from "install-packages";
import path from "path";

/**
 * Install all dependencies in a mod.d subfolder.
 * @param {Object} modDir The mod.d filesystem object.
 * @param {String} dirPath The path to LCBL's mod.d.
 * @returns A boolean indicating that the dependencies finished installing.
 */
async function installDeps(modDir, dirPath) {
    for (const mdr of modDir) {
       await installPkg({ cwd: path.join(dirPath + "/" + mdr.name) });
    };
    return true;
};


export { installDeps };