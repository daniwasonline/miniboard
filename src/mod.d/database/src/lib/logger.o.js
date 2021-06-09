#!/usr/bin/env node
/**
 * Name: mod.d/database/src/lib/logger.o.js
 * Created: 8 June 2021 @ 23:40 BST (22:40 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import chalk from "chalk";

/**
 * The logger for the Lightbox Core Runtime server.
 * @param {String} content The content of the log.
 * @param {("get"|"init"|"req")} type The event that the logger should conform to.
 * @returns {String} The processed log string.
*/
async function logEvent(content, type) {
    if (typeof content !== "string") return new TypeError(`Type of content expected was String. Got ${typeof content}`);
    
    switch (type) {
        case "init":
            var str = `${chalk["blue"].bold("LDB")}${process.addWhitespace(1)}${chalk.yellow("[INIT]")} ${chalk.blue(content)}`;
            console.log(str);
            return str;
            break;

        case "get":
            str = `${chalk["blue"].bold("LDB")}${process.addWhitespace(1)}${chalk.green("[GET]")} ${chalk.blue(content)}`;
            console.log(str);
            return str;
            break;

        case "set":
            str = `${chalk["blue"].bold("LDB")}${process.addWhitespace(1)}${chalk.cyan("[REQ]")} ${chalk.blue(content)}`;
            console.log(str);
            return str;
            break;

        case "req":
            str = `${chalk["blue"].bold("LDB")}${process.addWhitespace(1)}${chalk.yellow("[REQ]")} ${chalk.blue(content)}`;
            console.log(str);
            return str;
            break;
            

    };
    
};

export { logEvent };