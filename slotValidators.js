var {
    ok,
    error,
    validateColor,
    validateStyle,
    validateTextDrawable,
    validateClickActionRef,
    validateViewActionRef,
    validateCssRef,
    validateEventRef,
    validateDataRef, validateWebCard
} = require('./utils')

module.exports = {
    validate_SLOT_2_LINE: function (slot, dataObject, cssSource, eventSource, actionSource, referrer) {
        const topText = slot.top
        const bottomText = slot.bottom
        if (topText !== undefined) {
            validateTextWidget(topText, dataObject, cssSource, eventSource, actionSource, referrer + ".top")
        }
        if (bottomText !== undefined) {
            validateTextWidget(bottomText, dataObject, cssSource, eventSource, actionSource, referrer + ".bottom")
        }
    },
    validate_SLOT_TXT: function (slot, dataObject, cssSource, eventSource, actionSource, referrer) {
        validateTextWidget(slot.text, dataObject, cssSource, eventSource, actionSource, referrer + ".text")
    },
    validate_SLOT_LOT: function (slot, dataObject, cssSource, eventSource, actionSource, referrer) {
        validateImageWidget(slot.lottie, dataObject, cssSource, eventSource, actionSource, referrer + ".lottie")
    },
    validate_SLOT_IMG: function (slot, dataObject, cssSource, eventSource, actionSource, referrer) {
        validateImageWidget(slot.image, dataObject, cssSource, eventSource, actionSource, referrer + ".image")
    },
    validate_SLOT_PLAY: function (slot, dataObject, cssSource, eventSource, actionSource, referrer) {
        validatePlayableWidget(slot.playable, dataObject, cssSource, eventSource, actionSource, referrer + ".playable")
    },
    validate_SLOT_CHIP: function (slot, dataObject, cssSource, eventSource, actionSource, referrer) {
        validateChipWidget(slot.chip, dataObject, cssSource, eventSource, actionSource, referrer + ".chip")
    },
    validateItemSource: function (itemSource, itemRef, onFound) {
        validateItemReferencePresentInItemSource(itemSource, itemRef, onFound)
    }
}


function validateItemReferencePresentInItemSource(itemSource, itemRef, onFound) {
    if (itemSource[itemRef] === undefined) {
        error("ItemDefinitionNotFound: `" + itemRef + "` in itemSource")
        return
    }
    onFound(itemSource[itemRef])
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
    validateClickActionRef(actionSource, eventSource, chipWidget.cActionRef, referrer)
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
    validateClickActionRef(actionSource, eventSource, imageWidget.cActionRef, referrer)
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
        validateClickActionRef(actionSource, eventSource, dataObject, textWidget.cActionRef, referrer+" | ActionNode: actionSource.click." + textWidget.cActionRef)
    }
}