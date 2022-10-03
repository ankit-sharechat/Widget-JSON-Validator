const utils = require('./utils');
const error = utils.error

const {
    validate_SLOT_2_LINE,
    validate_SLOT_TXT,
    validate_SLOT_LOT,
    validate_SLOT_IMG,
    validate_SLOT_PLAY,
    validate_SLOT_CHIP
} = require('./slotValidators');

const {
    validateClickActionRef,
    validateViewActionRef,
    validateCssRef,
    validateDataRef
} = require('./utils');


const {
    validSlotTypes,
    validTemplateKeys,
    validItemsConfigKeys,
    validTemplateTypes,
    SLOT_TXT,
    SLOT_2_LINE,
    SLOT_IMG,
    SLOT_LOT,
    SLOT_CHIP,
    SLOT_PLAY,
    HEAD,
    ITEM_CARD,
    ITEM_STACK, GENERIC_V2, validColors, validTextStyle, WebCardNavigation
} = require('./constants')

function validateFeedItem(feedJson) {
    if (feedJson.t !== GENERIC_V2) {
        error(feedJson.t + " is not a valid type in Feed. It must be " + GENERIC_V2)
        return
    }
    validateWidget(feedJson.genericWidget)
}

function validateExploreItem(exploreJson) {
    if (exploreJson.type !== GENERIC_V2) {
        error(exploreJson.t + " is not a valid type in Explore Feed. It must be " + GENERIC_V2)
        return
    }
    validateWidget(exploreJson.component)
}

function validateKeys(keys, validKeys, referrer) {
    keys.forEach(key => {
        if (!validKeys.includes(key)) {
            error("Invalid Key: " + key + ", It must be one of [" + validKeys + "] | Info: " + referrer)
        }
    })
}

function validateItemsConfig(itemsConfig, referrer) {
    if (itemsConfig === undefined)
        return

    validateKeys(Object.keys(itemsConfig), validItemsConfigKeys, referrer)
}

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

function validateItems(widgetJson, items) {
    items.forEach(itemReference => {
        validateItemReference(widgetJson, itemReference, "items")
    })
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

function validateSlotDefinition(widgetJson, slot, dataObject, referrer) {
    switch (slot.type) {
        case SLOT_TXT :
            validate_SLOT_TXT(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_TXT)
            break
        case SLOT_2_LINE :
            validate_SLOT_2_LINE(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_2_LINE)
            break
        case SLOT_LOT:
            validate_SLOT_LOT(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_LOT)
            break
        case SLOT_IMG:
            validate_SLOT_IMG(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_IMG)
            break
        case SLOT_PLAY:
            validate_SLOT_PLAY(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_PLAY)
            break
        case SLOT_CHIP:
            validate_SLOT_CHIP(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_CHIP)
            break
        default:
            break
    }
}

function validateSlot(widgetJson, slot, dataObject, referrer) {
    if (slot === undefined)
        return

    const type = slot.type
    validateSlotType(type, referrer)
    validateSlotDefinition(widgetJson, slot, dataObject, referrer)
}

function validateSlotType(slotType, referrer) {
    if (!validSlotTypes.includes(slotType)) {
        error("Invalid Slot Type:" + slotType + ", It must be one of [" + validSlotTypes + "], Tree: " + referrer)
    }
}

function validateItemSource(itemSource, itemRef, onFound) {
    if (itemSource[itemRef] === undefined) {
        error("ItemDefinitionNotFound: `" + itemRef + "` in itemSource")
        return
    }
    onFound(itemSource[itemRef])
}

function validateTemplateType(type) {
    if (!validTemplateTypes.includes(type)) {
        error("Invalid Template Type: " + type)
    }
}
module.exports = { validateFeedItem, validateExploreItem}