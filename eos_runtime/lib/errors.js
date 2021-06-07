/**
 * 
 * @param {String} fi The path where the missing dependency should be 
 * @returns The process exiting
 */
function notFound(fi) {
    console.log(`The dependency "${fi}" does not exist. Please reinstall this app.`);
    return process.exit(2);
};

module.exports = { notFound };