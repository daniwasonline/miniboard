#!/usr/bin/env node
/**
 * Name: mod.d/core/src/lib/configuration.o.js
 * Created: 13 June 2021 @ 23:00 BST (22:00 GMT)
 * Author: jfoclpf <https://github.com/jfoclpf>
 * Maintainer: Daniel Hyders <git@bean.codes>
 * Licence: GNU GPLv3
*/

/**
 * Check if the request comes from Localhost
 * @param {Object} req The request object to be analysed
 * @returns {Boolean} A true/false depending on if it is localhost or not
 */
export default function (req) {
    var ip = req.connection.remoteAddress;
    var host = req.get('host');
    var bool = ip === "127.0.0.1" || ip === "::ffff:127.0.0.1" || ip === "::1" || host.indexOf("localhost") !== -1;
    return bool;
};
