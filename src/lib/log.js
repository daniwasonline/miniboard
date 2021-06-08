/**
 * Name: lib/log.js
 * Created: 8 June 2021 @ 15:20 BST (14:20 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import chalk from "chalk";
import gcf from "get-caller-file";
import path from "path";

/**
 * 
 * @param {String} content The content of the log.
 * @param {("error"|"success"|"loading"|"init")} event The event that the logger should conform to.
 * @returns {String} The processed log string.
*/
function initLogger(content, event) {
    const types = ["error", "success", "loading", "init"];
    if (typeof content !== "string") return new TypeError(`Type of content expected was String. Got ${typeof content}`);

    switch(event) {
        case "loading":
            return `${chalk.yellow("MCBL")} ${chalk.cyan("[LOADING]")} ${chalk.blue(content)}`;
            break;
        
        case "error":
            return `${chalk.yellow("MCBL")} ${chalk.red("[ERR]")} ${chalk.blue(content)}`;
            break;

        case "success":
            return `${chalk.yellow("MCBL")} ${chalk.green("[LOADED]")} ${chalk.blue(content)}`;
            break;

        case "init":
            if (gcf() !== path.join(__dirname + "/../main.js")) return new Error("Event Init can only be used in src/main.js.");
            if (gcf() == path.join(__dirname + "/../main.js")) return `${chalk.yellow("MCBL")} ${chalk.magenta("[INIT]")} ${chalk.blue(content)}`;
            break;
        case "default":
            return new Error("Event is undefined");
            break;
    };
};

/**
 * 
 * @param {Number} n The amount of characters the whitespace should take up.
 * @returns The whitespace string.
 */
function addWhitespace(n) {
    var str = "";
    for (let i = 0; i <= n; i++) {
        str = str + " ";
    };
    return str;
};

export { initLogger, addWhitespace };