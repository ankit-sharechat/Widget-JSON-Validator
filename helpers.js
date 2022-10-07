const {widgetCriticalField} = require("./constants");

let errors = []
function logError(msg) {
    //console.log('\x1b[31m', msg);  //Red
    errors.push(msg)
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
            logError("Invalid Key: " + key + ", It must be one of [" + validKeys + "] | Info: " + referrer)
        }
    })
}

function criticalFieldPresent(json) {
    const keysPresent = Object.keys(json)
    var allFieldPresent = true
    widgetCriticalField.forEach(field => {
        if (!keysPresent.includes(field)) {
            logError("`"+field+"` is missing in genericWidget")
            allFieldPresent = false
        }
    })
    return allFieldPresent
}

function getAllErros() {
    return errors
}

module.exports = {
    ok,
    error: logError,
    getDatasourceObject,
    getCssSource,
    getEventSource,
    getItemSource,
    getActionSource,
    validateKeys,
    criticalFieldPresent,
    getAllErros
}