const fs = require('fs');
const {validateFeedItem} = require("./feedValidator");
const {validateExploreItem} = require("./exploreItemValidator");
const {getAllErros} = require("./helpers");
const feedJson = JSON.parse(fs.readFileSync("./feedItem.json", "utf8"));
const exploreJson = JSON.parse(fs.readFileSync("./exploreItem.json", "utf8"));


//todo: Add Checks for Unused css
//todo: Add Checks for Unused data
//todo: Add Checks for Unused events
//todo: Add Checks for Unused actions
validateFeedItem(feedJson)
validateExploreItem(exploreJson)
printErros(getAllErros())

function printErros(errors) {
    console.log('\x1b[31m', "===========  All Errors ===========");  //Red
    console.log('\x1b[31m', "Total: "+errors.length);  //Red
    errors.forEach(error => {
        console.log('\x1b[31m', error);  //Red
    })
}