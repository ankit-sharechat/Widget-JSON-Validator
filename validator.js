var fs = require('fs');
var utils = require('./utils')
var {
    validate_SLOT_2_LINE,
    validate_SLOT_TXT,
    validate_SLOT_LOT,
    validate_SLOT_IMG,
    validate_SLOT_PLAY,
    validate_SLOT_CHIP,
    validateItemSource
} = require('./slotValidators')
const ok = utils.ok
const error = utils.error

var {
    validateColor,
    validateStyle,
    validateTextDrawable,
    validateClickActionRef,
    validateViewActionRef,
    validateCssRef,
    validateEventRef, validateDataRef
} = require('./utils')


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
    ITEM_STACK
} = require('./constants')
var json = JSON.parse(fs.readFileSync("./template.json", "utf8"))

validateWidget(json.template)

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

function validateWidget(template) {
    validateKeys(Object.keys(template), validTemplateKeys, "template")
    validateTemplateType(template.type)
    validateTemplateHeader(template.header)
    validateItems(template.items)
    validateItemReference(template.sctv, "sctv")
    validateItemsConfig(template.itemsConfig, "itemsConfig")
    validateItemsConfig(template.sctvConfig, "sctvConfig")
    validateCssRef(getCssSource(), template.cssRefs, "template")
}

function validateItemCard(itemDefinition, dataObject, referrer) {
    validateSlot(itemDefinition.topStart, dataObject, referrer + ".topStart")
    validateSlot(itemDefinition.topCenter, dataObject, referrer + ".topCenter")
    validateSlot(itemDefinition.topEnd, dataObject, referrer + ".topEnd")
    validateSlot(itemDefinition.bottomCenter, dataObject, referrer + ".bottomCenter")
    validateSlot(itemDefinition.center, dataObject, referrer + ".center")
    validateSlot(itemDefinition.bottomStart, dataObject, referrer + ".bottomStart")
    validateSlot(itemDefinition.bottomEnd, dataObject, referrer + ".bottomEnd")
    validateSlot(itemDefinition.content, dataObject, referrer + ".content")
}

function validateItemDefinition(itemDefinition, dataObject, referrer) {
    if (itemDefinition.type === ITEM_CARD) {
        validateItemCard(itemDefinition, dataObject, referrer)
    } else if (itemDefinition.type === ITEM_STACK) {
        validateItemCard(itemDefinition.top, dataObject.top, referrer + ".top")
        validateItemCard(itemDefinition.bottom, dataObject.bottom, referrer + ".bottom")
    }
}

function validateItemReference(itemReference, referrer) {
    if (itemReference === undefined)
        return

    var itemRef = itemReference.itemRef
    var dataRef = itemReference.dataRef
    var clickActionRef = itemReference.cActionRef
    var viewActionRef = itemReference.vActionRef

    validateItemSource(getItemSource(), itemRef, itemDefinition => {
        var dataPresent = validateDataRef(getDatasourceObject(), dataRef, "DataSourceKey: " + dataRef + " | Node: " + referrer + "." + itemRef)
        if (dataPresent) {
            validateItemDefinition(itemDefinition, getDatasourceObject()[dataRef], "DataSourceKey: " + dataRef + " | Node: " + referrer + "." + itemRef)
        }
    })

    validateViewActionRef(getActionSource(), getEventSource(), viewActionRef, "items." + itemRef)
    validateClickActionRef(getActionSource(), getEventSource(), clickActionRef, "items." + itemRef)
}

function validateItems(items) {
    items.forEach(itemReference => {
        validateItemReference(itemReference, "items")
    })
}


function getDatasourceObject() {
    return json.dataSource
}

function getCssSource() {
    return json.cssSource
}

function getEventSource() {
    return json.eventSource
}

function getItemSource() {
    return json.template.itemSource
}

function getActionSource() {
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

function validateTemplateHeader(header) {
    validateHeaderType(header.type)
    validDataSourceKey(getDatasourceObject(), header.dataRef, "DataSourceKey: " + header.dataRef + " | Node: header")
    validateSlot(header.left, getDatasourceObject()[header.dataRef], "DataSourceKey: " + header.dataRef + " | Node: header.left")
    validateSlot(header.right, getDatasourceObject()[header.dataRef], "DataSourceKey: " + header.dataRef + " | Node: header.right")
    validateCssRef(getCssSource(), header.cssRefs, "header")
    validateClickActionRef(getActionSource(), getEventSource(), header.cActionRef, "header")
}

function validateSlotDefinition(slot, dataObject, referrer) {
    switch (slot.type) {
        case SLOT_TXT :
            validate_SLOT_TXT(slot, dataObject, getCssSource(), getEventSource(), getActionSource(), referrer + "." + SLOT_TXT)
            break
        case SLOT_2_LINE :
            validate_SLOT_2_LINE(slot, dataObject, getCssSource(), getEventSource(), getActionSource(), referrer + "." + SLOT_2_LINE)
            break
        case SLOT_LOT:
            validate_SLOT_LOT(slot, dataObject, getCssSource(), getEventSource(), getActionSource(), referrer + "." + SLOT_LOT)
            break
        case SLOT_IMG:
            validate_SLOT_IMG(slot, dataObject, getCssSource(), getEventSource(), getActionSource(), referrer + "." + SLOT_IMG)
            break
        case SLOT_PLAY:
            validate_SLOT_PLAY(slot, dataObject, getCssSource(), getEventSource(), getActionSource(), referrer + "." + SLOT_PLAY)
            break
        case SLOT_CHIP:
            validate_SLOT_CHIP(slot, dataObject, getCssSource(), getEventSource(), getActionSource(), referrer + "." + SLOT_CHIP)
            break
        default:
            break
    }
}

function validateSlot(slot, dataObject, referrer) {
    if (slot === undefined)
        return

    const type = slot.type
    validateSlotType(type, referrer)
    validateSlotDefinition(slot, dataObject, referrer)
}

function validateSlotType(slotType, referrer) {
    if (!validSlotTypes.includes(slotType)) {
        error("Invalid Slot Type:" + slotType + ", It must be one of [" + validSlotTypes + "], Tree: " + referrer)
    }
}

function validateTemplateType(type) {
    if (!validTemplateTypes.includes(type)) {
        error("Invalid Template Type: " + type)
    }
}