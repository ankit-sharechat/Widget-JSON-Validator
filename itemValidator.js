const {ITEM_CARD, ITEM_STACK, validItemsConfigKeys} = require("./constants");

const {
    error, getActionSource, getEventSource,
    getDatasourceObject, getItemSource, validateKeys, onItemSourceReferred, dataSourceReferrerFormatter
} = require("./helpers");

const {validateSlot} = require("./slotValidators");
const {validateDataRef} = require("./dataValidator");
const {validateViewActionRef, validateClickActionRef} = require("./actionValidator");

function validateItems(widgetJson, items) {
    items.forEach(itemReference => {
        validateItemReference(widgetJson, itemReference, "items")
    })
}

function validateItemSource(itemSource, itemRef, onFound) {
    onItemSourceReferred(itemRef)
    if (itemSource[itemRef] === undefined) {
        error("ItemDefinitionNotFound: `" + itemRef + "` in itemSource")
        return
    }
    onFound(itemSource[itemRef])
}

function validateItemCard(widgetJson, itemDefinition, dataObject, referrer) {
    validateSlot(widgetJson, itemDefinition.topStart, dataObject, referrer + ".topStart")
    validateSlot(widgetJson, itemDefinition.topCenter, dataObject, referrer + ".topCenter")
    validateSlot(widgetJson, itemDefinition.topEnd, dataObject, referrer + ".topEnd")
    validateSlot(widgetJson, itemDefinition.bottomCenter, dataObject, referrer + ".bottomCenter")
    validateSlot(widgetJson, itemDefinition.center, dataObject, referrer + ".center")
    validateSlot(widgetJson, itemDefinition.bottomStart, dataObject, referrer + ".bottomStart")
    validateSlot(widgetJson, itemDefinition.bottomEnd, dataObject, referrer + ".bottomEnd")
    validateSlot(widgetJson, itemDefinition.content, dataObject, referrer + ".content")
}

function validateItemDefinition(widgetJson, itemDefinition, dataSource, dataRef, referrer) {
    if (itemDefinition.type === ITEM_CARD) {
        if (validateDataRef(dataSource, dataRef, dataSourceReferrerFormatter(dataRef) + referrer)) {
            validateItemCard(widgetJson, itemDefinition, dataSource[dataRef], referrer)
        }
    } else if (itemDefinition.type === ITEM_STACK) {
        if (validateDataRef(dataSource[dataRef], 'top', dataSourceReferrerFormatter(dataRef+".top") + referrer + ".top")) {
            validateItemCard(widgetJson, itemDefinition.top, dataSource.top, referrer + ".top")
        }

        if (validateDataRef(dataSource[dataRef], 'bottom', dataSourceReferrerFormatter(dataRef+".bottom") + referrer + ".bottom")) {
            validateItemCard(widgetJson, itemDefinition.bottom, dataSource.bottom, referrer + ".bottom")
        }
    }
}

function validateItemReference(widgetJson, itemReference, referrer) {
    if (itemReference === undefined)
        return

    const itemRef = itemReference.itemRef
    const dataRef = itemReference.dataRef
    const clickActionRef = itemReference.cActionRef
    const viewActionRef = itemReference.vActionRef

    referrer = dataSourceReferrerFormatter(dataRef) + "Node: " + referrer + "." + itemRef

    validateItemSource(getItemSource(widgetJson), itemRef, itemDefinition => {
        const dataPresent = validateDataRef(getDatasourceObject(widgetJson), dataRef, referrer)
        if (dataPresent) {
            validateItemDefinition(widgetJson, itemDefinition, getDatasourceObject(widgetJson), dataRef, referrer)
        }
    })

    validateViewActionRef(getActionSource(widgetJson), getEventSource(widgetJson), getDatasourceObject(widgetJson)[dataRef], viewActionRef, referrer)
    validateClickActionRef(getActionSource(widgetJson), getEventSource(widgetJson), getDatasourceObject(widgetJson)[dataRef], clickActionRef, referrer)
}

function validateItemsConfig(itemsConfig, referrer) {
    if (itemsConfig === undefined)
        return

    validateKeys(Object.keys(itemsConfig), validItemsConfigKeys, referrer)
}

module.exports = {validateItems, validateItemReference, validateItemsConfig}