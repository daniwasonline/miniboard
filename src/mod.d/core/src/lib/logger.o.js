#!/usr/bin/env node
/**
 * Name: mod.d/core/src/lib/logger.o.js
 * Created: 8 June 2021 @ 20:15 BST (19:15 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import chalk from "chalk";

/**
 * The logger for the Lightbox Core Runtime server.
 * @param {String} content The content of the log.
 * @param {("req"|"init")} type The event that the logger should conform to.
 * @returns {String} The processed log string.
*/
async function logEvent(content, type = "req") {
    if (typeof content !== "string") return new TypeError(`Type of content expected was String. Got ${typeof content}`);
    
    switch (type) {
        case "init":
            const str = `${chalk["magenta"].bold("LCR")}${process.addWhitespace(1)}${chalk.green("[INIT]")} ${chalk.blue(content)}`;
            console.log(str);
            return str;
            break;
    };
};

export { logEvent };