#!/usr/bin/env node
/**
 * Name: mod.d/[module]/src/lib/exposedClass.o.js
 * Created: 9 June 2021 @ 17:30 BST (16:30 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
 * This file is reused across Lightbox so JSDoc can be properly used
*/

import fetch from "node-fetch";
import fs from "fs";
import path from "path";

async function checkStatus() {
    var status;
    const chk = await fetch(`http://127.0.0.1:${process.lightboxdbconf.port}/check`).then(_ => { return true; }).catch(_ => { return false; });
    return chk;
};

class Lighthouse {
    /**
     * Create a new connection to a Lighthouse table
     * @param {String} table The table to connect to
     */
    constructor(table) { 
        if (!fs.existsSync(path.join(process.lightboxdbconf.path + `/${table}.lh`))) throw new Error("Table does not exist!");
        this.table = table;
    };

    /**
     * Get a key's value from a Lighthouse table
     * @param {(String|"all")} key The key to fetch from the table
     * @returns {(String|Object)} The value returned from the database
     */
    async get(key) {
        if (await checkStatus() == false) throw new Error("Cannot reach Lighthouse!");
        const res = await fetch(`http://127.0.0.1:${process.lightboxdbconf.port}/get/${this.table}/${key}`).then(r => r.json());
        if (res.status == 404) return undefined;
        var response = res.response;
        try {
            const JSONattempt = JSON.parse(response);
            response = JSONattempt;
        } catch (e) {
            response = res.response;
        };
        return response;
    };

    /**
     * Set a key's value in a Lighthouse table
     * @param {String} key The key to set in the table
     * @returns {(String|Object)} The value verified by the database
     */
    async set(key, value) {
        let val = value;
        if (await checkStatus() == false) throw new Error("Cannot reach Lighthouse!");
        if (typeof val == "object") val = JSON.stringify(value);
        const res = await fetch(`http://127.0.0.1:${process.lightboxdbconf.port}/set/${this.table}/${key}`, {
            method: "PUT",
            body: val
        }).then(r => r.json());
        return res.response;
    };
};

export default Lighthouse;
module.exports = Lighthouse;