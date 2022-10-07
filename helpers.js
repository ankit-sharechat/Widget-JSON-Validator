const {widgetCriticalField} = require("./constants");

let errors = []
let itemsReferred = []
let dataReferred = []
let cssReferred = []
let eventReferred = []
let actionReferred = []


function logError(msg) {
    //console.log('\x1b[31m', msg);  //Red
    errors.push(msg)
}

function ok(msg) {
    console.log('\x1b[32m', msg);  //Green
}


function printErrors(errors) {
    console.log('\x1b[31m', "===========  All Errors ===========");  //Red
    console.log('\x1b[31m', "Total: "+errors.length);  //Red
    errors.forEach(error => {
        console.log('\x1b[31m', error);  //Red
    })
}

function printOkMessage() {
    console.log('\x1b[32m', " =======================================");
    console.log('\x1b[32m', "|                                       |");
    console.log('\x1b[32m', "|           All Good! : 👍              |");
    console.log('\x1b[32m', "|                                       |");
    console.log('\x1b[32m', " =======================================");
}

function getDatasourceObject(json) {
    return json.dataSource
}

function getCssSource(json) {
    if (json.cssSource === undefined) {
        fieldMissing('cssSource')
    }
    return json.cssSource
}

function getEventSource(json) {
    if (json.eventSource === undefined) {
        fieldMissing('eventSource')
    }
    return json.eventSource
}

function getItemSource(json) {
    return json.template.itemSource
}

function getActionSource(json) {
    if (json.actionSource === undefined) {
        fieldMissing('actionSource')
    }
    return json.actionSource
}

function fieldMissing(fieldName) {
    logError("`"+fieldName+"` is Missing!")
}

function validateKeys(keys, validKeys, referrer) {
    keys.forEach(key => {
        if (!validKeys.includes(key)) {
            logError("Invalid Key: " + key + ", It must be one of [" + validKeys + "] | Info: " + referrer)
        }
    })
}

function onItemSourceReferred(key) {
    if (!itemsReferred.includes(key)) {
        itemsReferred.push(key)
    }
}

function onDataSourceReferred(key) {
    if (!dataReferred.includes(key)) {
        dataReferred.push(key)
    }
}

function onCssSourceReferred(key) {
    if (!cssReferred.includes(key)) {
        cssReferred.push(key)
    }
}

function onEventSourceReferred(key) {
    if (!eventReferred.includes(key)) {
        eventReferred.push(key)
    }
}

function onActionSourceReferred(key) {
    if (!actionReferred.includes(key)) {
        actionReferred.push(key)
    }
}

function getActionsReferred() {
    return actionReferred
}

function getEventsReferred() {
    return eventReferred
}

function getCssReferred() {
    return cssReferred
}

function getDataReferred() {
    return dataReferred
}

function getItemsReferred() {
    return itemsReferred
}

function criticalFieldPresent(json) {
    const keysPresent = Object.keys(json)
    let allFieldPresent = true
    widgetCriticalField.forEach(field => {
        if (!keysPresent.includes(field)) {
            fieldMissing(field)
            allFieldPresent = false
        }
    })
    return allFieldPresent
}

function getAllErrors() {
    return errors
}

module.exports = {
    error: logError,
    getDatasourceObject,
    getCssSource,
    getEventSource,
    getItemSource,
    getActionSource,
    validateKeys,
    criticalFieldPresent,
    getAllErrors,
    printErrors,
    printOkMessage,
    fieldMissing,
    onItemSourceReferred,
    onActionSourceReferred,
    onEventSourceReferred,
    onDataSourceReferred,
    onCssSourceReferred,
    getItemsReferred,
    getActionsReferred,
    getEventsReferred,
    getCssReferred,
    getDataReferred
}