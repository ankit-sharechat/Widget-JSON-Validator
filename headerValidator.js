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
const {validateDataNode} = require("./dataValidator");
const {InvalidHeaderType} = require("./errorMessage");

function validateHeaderType(type) {
    if (![HEAD].includes(type)) {
        error(InvalidHeaderType.title)
    }
}

function validateTemplateHeader(widgetJson, header) {
    if (header !== undefined) {
        validateHeaderType(header.type)
        validateKeys(Object.keys(header), validHeaderObjectKeys, "header")
        const dataNode = header.dataRef
        validateDataNode(getDatasourceObject(widgetJson), dataNode, dataSourceReferrerFormatter(dataNode) + "Node: header")

        validateSlot(widgetJson, header.left, getDatasourceObject(widgetJson), dataSourceReferrerFormatter(header.dataRef) + "Node: header.left", dataNode)
        validateSlot(widgetJson, header.right, getDatasourceObject(widgetJson), dataSourceReferrerFormatter(header.dataRef) + "Node: header.right", dataNode)
        validateCssRef(getCssSource(widgetJson), header.cssRefs, "header")
        validateClickActionRef(getActionSource(widgetJson), getEventSource(widgetJson), getDatasourceObject(widgetJson), header.cActionRef, dataSourceReferrerFormatter(header.dataRef) + "| Node: header", dataNode)
    }
}

module.exports = {validateTemplateHeader}