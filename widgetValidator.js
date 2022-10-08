const {validTemplateKeys, validTemplateTypes} = require("./constants");
const {
    validateKeys, getCssSource, criticalFieldPresent, logError, fieldMissing, error
} = require("./helpers");
const {validateTemplateHeader} = require("./headerValidator");
const {validateItems, validateItemReference, validateItemsConfig} = require("./itemValidator");
const {validateCssRef} = require("./cssValidator");

function validateWidget(widgetJson) {
    if (widgetJson !== undefined) {
        const template = widgetJson.template
        if (criticalFieldPresent(widgetJson)) {
            validateKeys(Object.keys(template), validTemplateKeys, "template")
            validateTemplateType(template.type)
            validateTemplateHeader(widgetJson, template.header)
            if (template.sctv !== undefined) {
                validateItemReference(widgetJson, template.sctv, "sctv",'sctv')
            }
            validateItems(widgetJson, template.items)
            validateItemsConfig(template.itemsConfig, "itemsConfig")
            validateItemsConfig(template.sctvConfig, "sctvConfig")
            validateCssRef(getCssSource(widgetJson), template.cssRefs, "template")
        }
    } else {
        fieldMissing('genericWidget')
    }
}

function validateTemplateType(type) {
    if (!validTemplateTypes.includes(type)) {
        error("Invalid Template Type: " + type)
    }
}

module.exports = {validateWidget}