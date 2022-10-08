const {
    SLOT_TXT,
    SLOT_2_LINE,
    SLOT_LOT,
    SLOT_IMG,
    SLOT_PLAY,
    SLOT_CHIP,
    validSlotTypes,
    validTextObjectKeys, validImageObjectKeys, validTwoLineTextSlotKeys, validPlayableObjectKeys, validChipObjectKeys
} = require("./constants");
const {getCssSource, getEventSource, getActionSource, error, validateKeys} = require("./helpers");
const {validateDataNode} = require("./dataValidator");
const {validateColor} = require("./colorValidator");
const {validateStyle} = require("./styleValidator");
const {validateCssRef} = require("./cssValidator");
const {validateClickActionRef} = require("./actionValidator");

//todo:
function validateSlot(widgetJson, slot, dataSource, referrer, dataNode) {
    if (slot === undefined)
        return

    const type = slot.type
    validateSlotType(type, referrer)
    validateSlotDefinition(widgetJson, slot, dataSource, referrer, dataNode)
}

function validateSlotType(slotType, referrer) {
    if (!validSlotTypes.includes(slotType)) {
        error("Invalid Slot Type:" + slotType + ", It must be one of [" + validSlotTypes + "], Tree: " + referrer)
    }
}

function validateSlotDefinition(widgetJson, slot, dataSource, referrer, dataNode) {
    switch (slot.type) {
        case SLOT_TXT :
            validateTextWidget(slot.text, dataSource, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_TXT, dataNode)
            break
        case SLOT_2_LINE :
            validateSlot2Line(slot, dataSource, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_2_LINE, dataNode)
            break
        case SLOT_LOT:
            validateLottieWidget(slot.lottie, dataSource, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_LOT, dataNode)
            break
        case SLOT_IMG:
            validateImageWidget(slot.image, dataSource, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_IMG, dataNode)
            break
        case SLOT_PLAY:
            validatePlayableWidget(slot.playable, dataSource, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_PLAY, dataNode)
            break
        case SLOT_CHIP:
            validateChipWidget(slot.chip, dataSource, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_CHIP, dataNode)
            break
        default:
            break
    }
}

function validateSlot2Line(slot, dataSource, cssSource, eventSource, actionSource, referrer, dataNode) {
    const topText = slot.top
    const bottomText = slot.bottom
    validateKeys(Object.keys(slot), validTwoLineTextSlotKeys, referrer)
    if (topText !== undefined) {
        validateTextWidget(topText, dataSource, cssSource, eventSource, actionSource, referrer + ".top", dataNode)
    }
    if (bottomText !== undefined) {
        validateTextWidget(bottomText, dataSource, cssSource, eventSource, actionSource, referrer + ".bottom", dataNode)
    }
}

function validateChipWidget(chipWidget, dataSource, cssSource, eventSource, actionSource, referrer, dataNode) {
    if (chipWidget === undefined) {
        error("`chip` Object is missing " + referrer)
        return
    }
    validateKeys(Object.keys(chipWidget), validChipObjectKeys, referrer)


    //Image Data
    validateDataNode(dataSource, dataNode + "." + chipWidget.imageRef, referrer)
    //Text Data
    validateDataNode(dataSource, dataNode + "." + chipWidget.textRef, referrer)
    //Color
    validateColor(chipWidget.color, referrer)
    //Style
    validateStyle(chipWidget.style, referrer)
    //Css Refs
    validateCssRef(cssSource, chipWidget.cssRefs, referrer)
    //Action Ref
    validateClickActionRef(actionSource, eventSource, dataSource, chipWidget.cActionRef, referrer, dataNode)
}

function validatePlayableWidget(playableWidget, dataSource, cssSource, eventSource, actionSource, referrer, dataNode) {
    if (playableWidget === undefined) {
        error("`playable` Object is missing " + referrer)
        return
    }
    validateKeys(Object.keys(playableWidget), validPlayableObjectKeys, referrer)

    //todo: fix validation for playable slots

    //DataSources
    if (playableWidget.gifRef !== undefined) {
        const newGifDataNode = dataNode + "." + playableWidget.gifRef
        validateDataNode(dataSource, newGifDataNode, referrer)
    }

    if (playableWidget.videoRef !== undefined) {
        const newVideoDataNode = dataNode + "." + playableWidget.videoRef
        validateDataNode(dataSource, newVideoDataNode, referrer)
    }

    if (playableWidget.thumbRef !== undefined) {
        const newThumbDataNode = dataNode + "." + playableWidget.thumbRef
        validateDataNode(dataSource, newThumbDataNode, referrer)
    }
}

function validateImageWidget(imageObject, dataSource, cssSource, eventSource, actionSource, referrer, dataNode) {
    if (imageObject === undefined) {
        error("`image` Object is missing " + referrer)
        return
    }

    validateKeys(Object.keys(imageObject), validImageObjectKeys, referrer)

    //DataSource
    const newDataNode = dataNode + "." + imageObject.dataRef
    validateDataNode(dataSource, newDataNode, referrer)
    //Css Refs
    validateCssRef(cssSource, imageObject.cssRefs, referrer)
    //Action Ref
    validateClickActionRef(actionSource, eventSource, dataSource, imageObject.cActionRef, referrer, dataNode)
}

function validateLottieWidget(lottieObject, dataSource, cssSource, eventSource, actionSource, referrer, dataNode) {
    if (lottieObject === undefined) {
        error("`lottie` Object is missing " + referrer)
        return
    }

    validateKeys(Object.keys(lottieObject), validImageObjectKeys, referrer)

    //DataSource
    const newDataNode = dataNode + "." + lottieObject.dataRef
    validateDataNode(dataSource, newDataNode, referrer)
    //Css Refs
    validateCssRef(cssSource, lottieObject.cssRefs, referrer)
    //Action Ref
    validateClickActionRef(actionSource, eventSource, dataSource, lottieObject.cActionRef, referrer, dataNode)
}

function validateTextWidget(textObject, dataSource, cssSource, eventSource, actionSource, referrer, dataNode) {
    if (textObject === undefined) {
        error("`text` Object is missing " + referrer)
        return
    }
    const newDataNode = dataNode + "." + textObject.dataRef
    validateKeys(Object.keys(textObject), validTextObjectKeys, referrer)
    //DataSource
    validateDataNode(dataSource, newDataNode, referrer)
    //Color
    validateColor(textObject.color, referrer)
    //Style
    validateStyle(textObject.style, referrer)

    //Left Drawable
    if (textObject.ld !== undefined) {
        if (Object.keys(textObject.ld).length === 0) {
            error("EmptyObject | " + referrer + ".ld")
            return
        }
        validateDataNode(dataSource, dataNode + "." + textObject.ld.dataRef, referrer + ".ld")
        validateCssRef(cssSource, textObject.ld.cssRefs, referrer + ".ld")
    }

    //Right Drawable
    if (textObject.rd !== undefined) {
        if (Object.keys(textObject.rd).length === 0) {
            error("EmptyObject | " + referrer + ".rd")
            return
        }
        validateDataNode(dataSource, dataNode + "." + textObject.rd.dataRef, referrer + ".rd")
        validateCssRef(cssSource, textObject.rd.cssRefs, referrer + ".rd")
    }

    //Css Refs
    if (textObject.cssRefs !== undefined) {
        //Validate Css Ref is a list
        validateCssRef(cssSource, textObject.cssRefs, referrer)
    }

    //Action Refs
    if (textObject.cActionRef !== undefined) {
        validateClickActionRef(actionSource, eventSource, dataSource, textObject.cActionRef, referrer, dataNode)
    }
}

module.exports = {validateSlot}