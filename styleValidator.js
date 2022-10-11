const {validTextStyle} = require("./constants");
const {error} = require("./helpers");
const {InvalidTextStyle} = require("./errorMessage");

function validateStyle(style, referrer) {
    if (style === undefined)
        return

    if (!(validTextStyle.includes(style))) {
        error(InvalidTextStyle.title+": TextStyle " + style + ", It must be one of " + validTextStyle + " Info: " + referrer)
    }
}

module.exports = { validateStyle }