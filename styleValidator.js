const {validTextStyle} = require("./constants");
const {error} = require("./utils");

function validateStyle(style, referrer) {
    if (style === undefined)
        return

    if (!(validTextStyle.includes(style))) {
        error("InvalidResource: TextStyle " + style + ", It must be one of " + validTextStyle + " Info: " + referrer)
    }
}

module.exports = { validateStyle }