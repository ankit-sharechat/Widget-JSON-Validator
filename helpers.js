const {widgetCriticalField} = require("./constants");

function error(msg) {
    console.log('\x1b[31m', msg);  //Red
}

function ok(msg) {
    console.log('\x1b[32m', msg);  //Green
}


function getDatasourceObject(json) {
    return json.dataSource
}

function getCssSource(json) {
    return json.cssSource
}

function getEventSource(json) {
    return json.eventSource
}

function getItemSource(json) {
    return json.template.itemSource
}

function getActionSource(json) {
    return json.actionSource
}

function validateKeys(keys, validKeys, referrer) {
    keys.forEach(key => {
        if (!validKeys.includes(key)) {
            error("Invalid Key: " + key + ", It must be one of [" + validKeys + "] | Info: " + referrer)
        }
    })
}

function criticalFieldPresent(json) {
    const keysPresent = Object.keys(json)
    var allFieldPresent = true
    widgetCriticalField.forEach(field => {
        if (!keysPresent.includes(field)) {
            error("`"+field+"` is missing in genericWidget")
            allFieldPresent = false
        }
    })
    return allFieldPresent
}

module.exports = {
    ok,
    error,
    getDatasourceObject,
    getCssSource,
    getEventSource,
    getItemSource,
    getActionSource,
    validateKeys,
    criticalFieldPresent
}