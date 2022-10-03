const {ITEM_CARD, ITEM_STACK, validItemsConfigKeys} = require("./constants");

const { error, getActionSource, getEventSource,
    getDatasourceObject, getItemSource, validateKeys
} = require("./utils");

const {validateSlot} = require("./slotValidators");
const {validateDataRef} = require("./dataValidator");
const {validateViewActionRef, validateClickActionRef} = require("./actionValidator");

function validateItems(widgetJson, items) {
    items.forEach(itemReference => {
        validateItemReference(widgetJson, itemReference, "items")
    })
}

function validateItemSource(itemSource, itemRef, onFound) {
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

function validateItemDefinition(widgetJson, itemDefinition, dataObject, referrer) {
    if (itemDefinition.type === ITEM_CARD) {
        validateItemCard(widgetJson, itemDefinition, dataObject, referrer)
    } else if (itemDefinition.type === ITEM_STACK) {
        validateItemCard(widgetJson, itemDefinition.top, dataObject.top, referrer + ".top")
        validateItemCard(widgetJson, itemDefinition.bottom, dataObject.bottom, referrer + ".bottom")
    }
}

function validateItemReference(widgetJson, itemReference, referrer) {
    if (itemReference === undefined)
        return

    const itemRef = itemReference.itemRef
    const dataRef = itemReference.dataRef
    const clickActionRef = itemReference.cActionRef
    const viewActionRef = itemReference.vActionRef

    referrer = "DataSourceKey: " + dataRef + " | Node: " + referrer + "." + itemRef

    validateItemSource(getItemSource(widgetJson), itemRef, itemDefinition => {
        const dataPresent = validateDataRef(getDatasourceObject(widgetJson), dataRef, referrer)
        if (dataPresent) {
            validateItemDefinition(widgetJson, itemDefinition, getDatasourceObject(widgetJson)[dataRef], referrer)
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