const {GENERIC_V2} = require("./constants");
const {error} = require("./utils");
const {validateWidget} = require("./widgetValidator");

function validateFeedItem(feedJson) {
    if (feedJson.t !== GENERIC_V2) {
        error(feedJson.t + " is not a valid type in Feed. It must be " + GENERIC_V2)
        return
    }
    validateWidget(feedJson.genericWidget)
}

module.exports = { validateFeedItem }