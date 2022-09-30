const {validColors, validTextStyle, WebCardNavigation} = require("./constants");

function logError(msg) {
    console.log('\x1b[31m', msg);  //Red
}

function logOk(msg) {
    console.log('\x1b[32m', msg);  //Green
}

const colorHexRegex = '^#[A-Fa-f0-9]+$'

function validateEventRef(eventSource, eventRef, dataObject, referrer) {
    if (eventRef !== undefined) {
        //Validate event Ref is a list
        if (eventSource[eventRef] === undefined) {
            logError("EventNotFound: `" + eventRef + "` in eventSource")
        } else {
            //validate placeholder
            validatePlaceHolder(eventSource[eventRef], dataObject, referrer)
        }
    }
}

function validatePlaceHolder(jsonObject, dataObject, referrer) {
    const keys = Object.keys(jsonObject)
    keys.forEach(key => {
        const isPlaceholder = jsonObject[key].toString().startsWith("@")
        if (isPlaceholder) {
            const placeholderKey = jsonObject[key].substring(1)
            validateDataRef(dataObject, placeholderKey, referrer)
        }
    })
}

function validateEventObject(eventSource, dataObject, eventRef, referrer) {
    if (eventRef !== undefined) {
        if (eventSource[eventRef] !== undefined) {
            validatePlaceHolder(eventSource[eventRef], dataObject, referrer)
        }
    }
}

function validateDataRef(dataSource, dataRef, referrer) {
    if (dataRef !== undefined) {
        //Validate Css Ref is a list
        if (dataSource[dataRef] === undefined) {
            logError("DataNotFound: `" + dataRef + "` in dataSource. Info: { " + referrer + " }")
        } else {
            return true
        }
    }
    return false
}

function validateViewActionRef(actionSource, eventSource, dataObject, actionRef, referrer) {
    if (actionRef !== undefined) {
        //Validate Css Ref is a list
        if (actionSource.view[actionRef] === undefined) {
            logError("ViewActionNotFound: `" + actionRef + "` in actionSource.view{}. Info: { " + referrer + " }")
            return false
        } else {
            const actionObject = actionSource.view[actionRef]
            validateEventObject(eventSource, dataObject, actionObject.eventRef, referrer)
        }
        return true
    }
}

module.exports = {
    ok: function (msg) {
        logOk(msg)
    },

    error: function (msg) {
        noErrorFound = false
        logError(msg)
    },

    validateColor: function (color, referrer) {
        if (color === undefined)
            return

        if (!(color.match(colorHexRegex) || validColors.includes(color))) {
            logError("InvalidResource: Color " + color + ", It must be a valid color hex, or one of " + validColors + " Info: " + referrer)
        }
    },

    validateStyle: function (style, referrer) {
        if (style === undefined)
            return

        if (!(validTextStyle.includes(style))) {
            logError("InvalidResource: TextStyle " + style + ", It must be one of " + validTextStyle + " Info: " + referrer)
        }
    },
    validateDataRef,
    validateCssRef: function (cssSource, cssRefs, referrer) {
        if (cssRefs !== undefined) {
            //Validate Css Ref is a list
            cssRefs.forEach(cssRef => {
                if (cssSource[cssRef] === undefined) {
                    logError("CssNotFound: `" + cssRef + "` in cssSource, Info: { " + referrer + " }")
                }
            })
        }
    },
    validateViewActionRef,
    validateClickActionRef: function (actionSource, eventSource, actionRef, referrer) {
        if (actionRef !== undefined) {
            const clickAction = actionSource.click[actionRef]
            if (clickAction === undefined) {
                logError("ClickActionNotFound: `" + actionRef + "` in actionSource.click. Info: { " + referrer + " }")
                return false
            } else {
                //todo validate placeholders
            }
            return true
        }
    }, validateEventRef,

    validateClickActionObject: function (clickActionObject, dataObject, eventSource, referrer) {
        if (clickActionObject === undefined)
            return

        if (clickActionObject.type !== WebCardNavigation) {
            logError("ActionTypeError: " + clickActionObject.type + ". Required `" + WebCardNavigation + "` | Info: " + referrer)
        }

        if (clickActionObject.webCard === undefined) {
            logError("MissingObject: webCard | Info: " + referrer)
        } else {
            //validate placeholders
            validatePlaceHolder(clickActionObject.webCard, dataObject, referrer + ".webCard")
        }

        validateEventRef(eventSource, clickActionObject.eventRef, dataObject, referrer)
    }
}