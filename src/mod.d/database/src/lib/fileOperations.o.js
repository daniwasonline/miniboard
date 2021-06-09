#!/usr/bin/env node
/**
 * Name: mod.d/database/src/lib/fileOperations.o.js
 * Created: 9 June 2021 @ 00:00 BST (23:00 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

/**
 * Load Lighthouse table
 * @param {String} tableName The name of the Lighthouse database table to utilise
 * @param {String} tpath The path to the Lighthouse data directory
 * @returns {Object} The JSON interpretation of the YAML
 */
function loadTable(tableName, tpath) {
    if (!fs.existsSync(path.join(tpath + `/${tableName}.lh`))) throw new Error("Table does not exist!");
    var place = yaml.load(fs.readFileSync(path.join(tpath + `/${tableName}.lh`), 'utf8'));
    if (place == null) place = {};
    return place;
};

/**
 * Save Lighthouse table
 * @param {String} tableName The name of the Lighthouse database table to utilise
 * @param {String} tpath The path to the Lighthouse data directory
 */
function saveTable(data, tableName, tpath) {
    if (typeof data !== "object") throw new TypeError(`Type of data expected was Object, got ${typeof data}`);
    if (!fs.existsSync(path.join(tpath + `/${tableName}.lh`))) return new Error("Table does not exist!");
    fs.writeFileSync(path.join(tpath + `/${tableName}.lh`), `# This file was generated on ${new Date().toUTCString()}\n` + yaml.dump(data));
    return true;
};

/**
 * Create Lighthouse table
 * @param {String} tableName The name of the Lighthouse database table to utilise
 * @param {String} tpath The path to the Lighthouse data directory
 */
function createTable(tableName, tpath) {
    if (fs.existsSync(path.join(tpath + `/${tableName}.lh`))) throw new Error("Table already exists!");
    fs.writeFileSync(path.join(tpath + `/${tableName}.lh`), `# This file was generated on ${new Date().toUTCString()}`);
    return true;
};

/**
 * Delete Lighthouse table
 * @param {String} tableName The name of the Lighthouse database table to utilise
 * @param {String} tpath The path to the Lighthouse data directory
 */
function deleteTable(tableName, tpath) {
    if (!fs.existsSync(path.join(tpath + `/${tableName}.lh`))) throw new Error("Table does not exist!");
    fs.unlinkSync(path.join(tpath + `/${tableName}.lh`));
    return true;
};

export { loadTable, saveTable, createTable, deleteTable }; 