const {SLOT_TXT, SLOT_2_LINE, SLOT_LOT, SLOT_IMG, SLOT_PLAY, SLOT_CHIP, validSlotTypes} = require("./constants");
const {getCssSource, getEventSource, getActionSource, error} = require("./index");
const {validateDataRef} = require("./dataValidator");
const {validateColor} = require("./colorValidator");
const {validateStyle} = require("./styleValidator");
const {validateCssRef} = require("./cssValidator");
const {validateClickActionRef} = require("./actionValidator");

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

function validateSlotDefinition(widgetJson, slot, dataObject, referrer) {
    switch (slot.type) {
        case SLOT_TXT :
            validateTextWidget(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_TXT)
            break
        case SLOT_2_LINE :
            validateSlot2Line(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_2_LINE)
            break
        case SLOT_LOT:
            validateImageWidget(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_LOT)
            break
        case SLOT_IMG:
            validateImageWidget(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_IMG)
            break
        case SLOT_PLAY:
            validatePlayableWidget(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_PLAY)
            break
        case SLOT_CHIP:
            validateChipWidget(slot, dataObject, getCssSource(widgetJson), getEventSource(widgetJson), getActionSource(widgetJson), referrer + "." + SLOT_CHIP)
            break
        default:
            break
    }
}

function validateSlot2Line(slot, dataObject, cssSource, eventSource, actionSource, referrer) {
    const topText = slot.top
    const bottomText = slot.bottom
    if (topText !== undefined) {
        validateTextWidget(topText, dataObject, cssSource, eventSource, actionSource, referrer + ".top")
    }
    if (bottomText !== undefined) {
        validateTextWidget(bottomText, dataObject, cssSource, eventSource, actionSource, referrer + ".bottom")
    }
}

function validateChipWidget(chipWidget, dataObject, cssSource, eventSource, actionSource, referrer) {
    //Image Data
    validateDataRef(dataObject, chipWidget.imageRef, referrer)
    //Text Data
    validateDataRef(dataObject, chipWidget.textRef, referrer)
    //Color
    validateColor(chipWidget.color, referrer)
    //Style
    validateStyle(chipWidget.style, referrer)
    //Css Refs
    validateCssRef(cssSource, chipWidget.cssRefs, referrer)
    //Action Ref
    validateClickActionRef(actionSource, eventSource, dataObject, chipWidget.cActionRef, referrer)
}

function validatePlayableWidget(playableWidget, dataObject, cssSource, eventSource, actionSource, referrer) {
    //DataSources
    validateDataRef(dataObject, playableWidget.gifRef, referrer)
    validateDataRef(dataObject, playableWidget.thumbRef, referrer)
    validateDataRef(dataObject, playableWidget.videoRef, referrer)
}

function validateImageWidget(imageWidget, dataObject, cssSource, eventSource, actionSource, referrer) {
    //DataSource
    validateDataRef(dataObject, imageWidget.dataRef, referrer)
    //Css Refs
    validateCssRef(cssSource, imageWidget.cssRefs, referrer)
    //Action Ref
    validateClickActionRef(actionSource, eventSource, dataObject, imageWidget.cActionRef, referrer)
}

function validateTextWidget(textWidget, dataObject, cssSource, eventSource, actionSource, referrer) {
    //DataSource
    validateDataRef(dataObject, textWidget.dataRef, referrer)
    //Color
    validateColor(textWidget.color, referrer)
    //Style
    validateStyle(textWidget.style, referrer)

    //Left Drawable
    if (textWidget.ld !== undefined) {
        if (Object.keys(textWidget.ld).length === 0) {
            error("EmptyObject | " + referrer + ".ld")
            return
        }
        validateDataRef(dataObject, textWidget.ld.dataRef, referrer + ".ld")
        validateCssRef(cssSource, textWidget.ld.cssRefs, referrer + ".ld")
    }

    //Right Drawable
    if (textWidget.rd !== undefined) {
        if (Object.keys(textWidget.rd).length === 0) {
            error("EmptyObject | " + referrer + ".rd")
            return
        }
        validateDataRef(dataObject, textWidget.rd.dataRef, referrer + ".rd")
        validateCssRef(cssSource, textWidget.rd.cssRefs, referrer + ".rd")
    }

    //Css Refs
    if (textWidget.cssRefs !== undefined) {
        //Validate Css Ref is a list
        textWidget.cssRefs.forEach(cssRef => {
            validateCssRef(cssSource, cssRef, referrer)
        })
    }

    //Action Refs
    if (textWidget.cActionRef !== undefined) {
        validateClickActionRef(actionSource, eventSource, dataObject, textWidget.cActionRef, referrer)
    }
}

module.exports = {validateSlot}