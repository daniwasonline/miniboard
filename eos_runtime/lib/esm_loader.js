const path = require("path");
const fs = require("fs");
const eosEsmFile = process.eosEsmFile;
delete process.eosEsmFile;

require = require("esm")(module/*, options*/);
module.exports = require(eosEsmFile);