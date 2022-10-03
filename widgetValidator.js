const {validTemplateKeys, validTemplateTypes} = require("./constants");
const {
    validateKeys, getCssSource,
    error
} = require("./index");
const {validateTemplateHeader} = require("./headerValidator");
const {validateItems, validateItemReference, validateItemsConfig} = require("./itemValidator");
const {validateCssRef} = require("./cssValidator");

function validateWidget(widgetJson) {
    const template = widgetJson.template

    validateKeys(Object.keys(template), validTemplateKeys, "template")
    validateTemplateType(template.type)
    validateTemplateHeader(widgetJson, template.header)
    validateItems(widgetJson, template.items)
    validateItemReference(widgetJson, template.sctv, "sctv")

    validateItemsConfig(template.itemsConfig, "itemsConfig")
    validateItemsConfig(template.sctvConfig, "sctvConfig")
    validateCssRef(getCssSource(widgetJson), template.cssRefs, "template")
}

function validateTemplateType(type) {
    if (!validTemplateTypes.includes(type)) {
        error("Invalid Template Type: " + type)
    }
}

module.exports = {validateWidget}