const {HEAD, validHeaderObjectKeys} = require("./constants");
const {
    getDatasourceObject,
    getCssSource,
    getActionSource,
    getEventSource, error, validateKeys, dataSourceReferrerFormatter
} = require("./helpers");
const {validateSlot} = require("./slotValidators");
const {validateCssRef} = require("./cssValidator");
const {validateClickActionRef} = require("./actionValidator");
const {validateDataRef} = require("./dataValidator");

function validateHeaderType(type) {
    if (![HEAD].includes(type)) {
        error("Invalid Header Type")
    }
}

function validateTemplateHeader(widgetJson, header) {
    if (header !== undefined) {
        validateHeaderType(header.type)
        validateKeys(Object.keys(header), validHeaderObjectKeys, "header")
        validateDataRef(getDatasourceObject(widgetJson), header.dataRef, dataSourceReferrerFormatter(header.dataRef) + "Node: header")
        validateSlot(widgetJson, header.left, getDatasourceObject(widgetJson)[header.dataRef], dataSourceReferrerFormatter(header.dataRef) + "Node: header.left")
        validateSlot(widgetJson, header.right, getDatasourceObject(widgetJson)[header.dataRef], dataSourceReferrerFormatter(header.dataRef) + "Node: header.right")
        validateCssRef(getCssSource(widgetJson), header.cssRefs, "header")
        validateClickActionRef(getActionSource(widgetJson), getEventSource(widgetJson), getDatasourceObject(widgetJson)[header.dataRef], header.cActionRef, dataSourceReferrerFormatter(header.dataRef) + "| Node: header")
    }
}

module.exports = {validateTemplateHeader}