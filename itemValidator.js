const {ITEM_CARD, ITEM_STACK, validItemsConfigKeys} = require("./constants");

const {
    error, getActionSource, getEventSource,
    getDatasourceObject, getItemSource, validateKeys, onItemSourceReferred, dataSourceReferrerFormatter
} = require("./helpers");

const {validateSlot} = require("./slotValidators");
const {validateDataNode} = require("./dataValidator");
const {validateViewActionRef, validateClickActionRef} = require("./actionValidator");

function validateItems(widgetJson, items) {
    items.forEach(itemReference => {
        validateItemReference(widgetJson, itemReference, "items", 'items')
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

function validateItemCard(widgetJson, itemDefinition, dataObject, referrer, dataNode) {
    validateSlot(widgetJson, itemDefinition.topStart, dataObject, referrer + ".topStart", dataNode)
    validateSlot(widgetJson, itemDefinition.topCenter, dataObject, referrer + ".topCenter", dataNode)
    validateSlot(widgetJson, itemDefinition.topEnd, dataObject, referrer + ".topEnd", dataNode)
    validateSlot(widgetJson, itemDefinition.bottomCenter, dataObject, referrer + ".bottomCenter", dataNode)
    validateSlot(widgetJson, itemDefinition.center, dataObject, referrer + ".center", dataNode)
    validateSlot(widgetJson, itemDefinition.bottomStart, dataObject, referrer + ".bottomStart", dataNode)
    validateSlot(widgetJson, itemDefinition.bottomEnd, dataObject, referrer + ".bottomEnd", dataNode)
    validateSlot(widgetJson, itemDefinition.content, dataObject, referrer + ".content", dataNode)
}

function validateItemDefinition(widgetJson, itemDefinition, dataSource, referrer, dataNode) {
    if (itemDefinition.type === ITEM_CARD) {
        validateItemCard(widgetJson, itemDefinition, dataSource, referrer, dataNode)
    } else if (itemDefinition.type === ITEM_STACK) {
        const topDataNode = dataNode + ".top"
        if (validateDataNode(dataSource, topDataNode, dataSourceReferrerFormatter(topDataNode) + referrer + ".top", topDataNode)) {
            validateItemCard(widgetJson, itemDefinition.top, dataSource, referrer + ".top", topDataNode)
        }

        const bottomDataNode = dataNode + ".bottom"
        if (validateDataNode(dataSource, bottomDataNode, dataSourceReferrerFormatter(bottomDataNode) + referrer + ".bottom", bottomDataNode)) {
            validateItemCard(widgetJson, itemDefinition.bottom, dataSource, referrer + ".bottom", bottomDataNode)
        }
    }
}

function validateItemReference(widgetJson, itemReference, referrer, dataNode) {
    if (itemReference === undefined)
        return

    const itemRef = itemReference.itemRef
    const newDataNode = dataNode + "." + itemReference.dataRef
    const clickActionRef = itemReference.cActionRef
    const viewActionRef = itemReference.vActionRef

    referrer = dataSourceReferrerFormatter(newDataNode) + "Node: " + referrer + "." + itemRef

    validateItemSource(getItemSource(widgetJson), itemRef, itemDefinition => {
        const dataPresent = validateDataNode(getDatasourceObject(widgetJson), newDataNode, referrer)
        if (dataPresent) {
            validateItemDefinition(widgetJson, itemDefinition, getDatasourceObject(widgetJson), referrer, newDataNode)
        }
    })

    validateViewActionRef(getActionSource(widgetJson), getEventSource(widgetJson), getDatasourceObject(widgetJson), viewActionRef, referrer, newDataNode)
    validateClickActionRef(getActionSource(widgetJson), getEventSource(widgetJson), getDatasourceObject(widgetJson), clickActionRef, referrer, newDataNode)
}

function validateItemsConfig(itemsConfig, referrer) {
    if (itemsConfig === undefined)
        return

    validateKeys(Object.keys(itemsConfig), validItemsConfigKeys, referrer)
}

module.exports = {validateItems, validateItemReference, validateItemsConfig}