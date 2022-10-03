const fs = require('fs');
const {validateFeedItem} = require("./feedValidator");
const {validateExploreItem} = require("./exploreItemValidator");
const feedJson = JSON.parse(fs.readFileSync("./feedItem.json", "utf8"));
const exploreJson = JSON.parse(fs.readFileSync("./exploreItem.json", "utf8"));


//todo: Unused css
//todo: Unused data
//todo: Unused events
//todo: Unused actions
validateFeedItem(feedJson)
validateExploreItem(exploreJson)
