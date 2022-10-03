const {HEAD} = require("./constants");
const {
    getDatasourceObject,
    getCssSource,
    getActionSource,
    getEventSource, error
} = require("./helpers");
const {validateSlot} = require("./slotValidators");
const {validateCssRef} = require("./cssValidator");
const {validateClickActionRef} = require("./actionValidator");

function validateHeaderType(type) {
    if (![HEAD].includes(type)) {
        error("Invalid Header Type")
    }
}

function validDataSourceKey(dataSourceObject, objectKey, referringObject) {
    const datasource = dataSourceObject[objectKey]
    if (datasource === undefined) {
        error(referringObject + " : " + objectKey + " is Not present in dataSource")
    }
}

function validateTemplateHeader(widgetJson, header) {
    validateHeaderType(header.type)
    validDataSourceKey(getDatasourceObject(widgetJson), header.dataRef, "DataSourceKey: " + header.dataRef + " | Node: header")
    validateSlot(widgetJson, header.left, getDatasourceObject(widgetJson)[header.dataRef], "DataSourceKey: " + header.dataRef + " | Node: header.left")
    validateSlot(widgetJson, header.right, getDatasourceObject(widgetJson)[header.dataRef], "DataSourceKey: " + header.dataRef + " | Node: header.right")
    validateCssRef(getCssSource(widgetJson), header.cssRefs, "header")
    validateClickActionRef(getActionSource(widgetJson), getEventSource(widgetJson), getDatasourceObject(widgetJson)[header.dataRef], header.cActionRef, "DataSourceKey: " + header.dataRef + " | Node: header")
}

module.exports = {validateTemplateHeader}