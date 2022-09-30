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
    validateDataRef
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
    validateItemSource : function (itemSource, itemRef, onFound) {
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
    //DataSource
    validateDataRef(dataObject, chipWidget.imageRef, referrer)
    validateDataRef(dataObject, chipWidget.textRef, referrer)

    //Colors
    validateColor(chipWidget.color, referrer)
    //Style
    validateStyle(chipWidget.style, referrer)

    //Css Refs
    if (chipWidget.cssRefs !== undefined) {
        //Validate Css Ref is a list
        chipWidget.cssRefs.forEach(cssRef => {
            validateCssRef(cssSource, cssRef, referrer)
        })
    }

    //Action Refs
    if (chipWidget.cActionRef !== undefined) {
        validateClickActionRef(actionSource, eventSource, chipWidget.cActionRef, referrer)
    }
}

function validatePlayableWidget(playableWidget, dataObject, cssSource, eventSource, actionSource, referrer) {
    //DataSource
    validateDataRef(dataObject, playableWidget.gifRef, referrer)
    validateDataRef(dataObject, playableWidget.thumbRef, referrer)
    validateDataRef(dataObject, playableWidget.videoRef, referrer)
}

function validateImageWidget(imageWidget, dataObject, cssSource, eventSource, actionSource, referrer) {
    //DataSource
    validateDataRef(dataObject, imageWidget.dataRef, referrer)

    //Css Refs
    if (imageWidget.cssRefs !== undefined) {
        //Validate Css Ref is a list
        imageWidget.cssRefs.forEach(cssRef => {
            validateCssRef(cssSource, cssRef, referrer)
        })
    }

    //Action Refs
    if (imageWidget.cActionRef !== undefined) {
        validateClickActionRef(actionSource, eventSource, imageWidget.cActionRef, referrer)
    }
}

function validateTextWidget(textWidget, dataObject, cssSource, eventSource, actionSource, referrer) {
    //DataSource
    validateDataRef(dataObject, textWidget.dataRef, referrer)

    //Colors
    validateColor(textWidget.color, referrer)
    //Style
    validateStyle(textWidget.style, referrer)

    //Left Drawable
    if (textWidget.ld !== undefined) {
        validateTextDrawable(textWidget.ld)
    }

    //Right Drawable
    if (textWidget.rd !== undefined) {
        validateTextDrawable(textWidget.rd)
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
        validateClickActionRef(actionSource, eventSource, textWidget.cActionRef, referrer)
    }
}