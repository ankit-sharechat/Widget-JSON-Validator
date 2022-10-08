const fs = require('fs');
const {validateFeedItem} = require("./feedValidator");
const {validateExploreItem} = require("./exploreItemValidator");
const {getAllErrors, printOkMessage, printErrors} = require("./helpers");
const feedJson = JSON.parse(fs.readFileSync("./feedItem.json", "utf8"));
const exploreJson = JSON.parse(fs.readFileSync("./exploreItem.json", "utf8"));

validateFeedItem(feedJson)
//validateExploreItem(exploreJson)

const allError = getAllErrors()
if (allError.length === 0) {
    printOkMessage()
} else {
    printErrors(allError)
}