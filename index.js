const fs = require('fs');
const {validateFeedItem} = require("./feedValidator");
const {validateExploreItem} = require("./exploreItemValidator");
const {getAllErrors, printOkMessage, printErrors} = require("./helpers");
const feedJson = JSON.parse(fs.readFileSync("./feedItem.json", "utf8"));
const exploreJson = JSON.parse(fs.readFileSync("./exploreItem.json", "utf8"));


//todo: Add Checks for Unused css
//todo: Add Checks for Unused data
//todo: Add Checks for Unused events
//todo: Add Checks for Unused actions
validateFeedItem(feedJson)
validateExploreItem(exploreJson)

const allError = getAllErrors()
if (allError.length === 0) {
    printOkMessage()
} else {
    printErrors(allError)
}