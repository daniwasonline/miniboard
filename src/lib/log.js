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
 * The logger for the Lightbox Core Boot-time Loader.
 * @param {String} content The content of the log.
 * @param {("error"|"success"|"loading"|"init")} event The event that the logger should conform to.
 * @returns {String} The processed log string.
*/
function initLogger(content, event) {
    if (typeof content !== "string") return new TypeError(`Type of content expected was String. Got ${typeof content}`);

    switch(event) {
        case "loading":
            return `${chalk["yellow"].bold("LCBL")} ${chalk.cyan("[LOADING]")} ${chalk.blue(content)}`;
            break;
        
        case "error":
            return `${chalk["yellow"].bold("LCBL")} ${chalk.red("[ERR]")} ${chalk.blue(content)}`;
            break;

        case "success":
            return `${chalk["yellow"].bold("LCBL")} ${chalk.green("[LOADED]")} ${chalk.blue(content)}`;
            break;

        case "init":
            if (gcf() !== path.join(__dirname + "/../lcbl.o")) return new Error("Event Init can only be used in src/lcbl.o.");
            if (gcf() == path.join(__dirname + "/../lcbl.o")) return `${chalk["yellow"].bold("LCBL")} ${chalk.magenta("[INIT]")} ${chalk.blue(content)}`;
            break;
            
        case "default":
            return new Error("Event is undefined");
            break;
    };
};

/**
 * Programatically add whitespace without manually adding it to the string.
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