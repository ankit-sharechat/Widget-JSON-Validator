const {GENERIC_V2} = require("./constants");
const {error} = require("./utils");
const {validateWidget} = require("./widgetValidator");

function validateExploreItem(exploreJson) {
    if (exploreJson.type !== GENERIC_V2) {
        error(exploreJson.t + " is not a valid type in Explore Feed. It must be " + GENERIC_V2)
        return
    }
    validateWidget(exploreJson.component)
}

module.exports = { validateExploreItem }