#!/usr/bin/env node
/**
 * Name: mod.d/core/src/lib/configuration.o.js
 * Created: 9 June 2021 @ 21:00 BST (20:00 GMT)
 * Author: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

import path from "path";
import Lighthouse from "./exposedClass.o";
import express from "express";
/**
 * Check the configuration to see if it has been configured or not.
 * @returns {Boolean} Returns true/false depending on if the configuration has been set or not.
 */
async function checkForFirstStart() {
    const config = new Lighthouse("config");
    const generic = new Lighthouse("default");
    const themes = new Lighthouse("themes");
    if (await themes.get("current") == undefined || await config.get("locale") == undefined || await generic.get("name") == undefined) return true;
    else return false;
};

export { checkForFirstStart };