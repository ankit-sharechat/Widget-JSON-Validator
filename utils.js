const {validColors, validTextStyle, WebCardNavigation} = require("./constants");

function error(msg) {
    console.log('\x1b[31m', msg);  //Red
}

function ok(msg) {
    console.log('\x1b[32m', msg);  //Green
}

const colorHexRegex = '^#[A-Fa-f0-9]+$'

function validateColor(color, referrer) {
    if (color === undefined)
        return

    if (!(color.match(colorHexRegex) || validColors.includes(color))) {
        error("InvalidResource: Color " + color + ", It must be a valid color hex, or one of " + validColors + " Info: " + referrer)
    }
}

function validateStyle(style, referrer) {
    if (style === undefined)
        return

    if (!(validTextStyle.includes(style))) {
        error("InvalidResource: TextStyle " + style + ", It must be one of " + validTextStyle + " Info: " + referrer)
    }
}

function validateCssRef(cssSource, cssRefs, referrer) {
    if (cssRefs !== undefined) {
        //Validate Css Ref is a list
        cssRefs.forEach(cssRef => {
            if (cssSource[cssRef] === undefined) {
                error("CssNotFound: `" + cssRef + "` in cssSource, Info: { " + referrer + " }")
            }
        })
    }
}

function validateEventRef(eventSource, eventRef, dataObject, referrer) {
    if (eventRef !== undefined) {
        //Validate event Ref is a list
        if (eventSource[eventRef] === undefined) {
            error("EventNotFound: `" + eventRef + "` in eventSource")
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
            error("DataNotFound: `" + dataRef + "` in dataSource. Info: { " + referrer + " }")
        }
    }
}

function validateViewActionRef(actionSource, eventSource, dataObject, actionRef, referrer) {
    if (actionRef !== undefined) {
        //Validate Css Ref is a list
        if (actionSource.view[actionRef] === undefined) {
            error("ViewActionNotFound: `" + actionRef + "` in actionSource.view{}. Info: { " + referrer + " }")
        } else {
            const actionObject = actionSource.view[actionRef]
            validateEventObject(eventSource, dataObject, actionObject.eventRef, referrer)
        }
    }
}

function validateClickActionRef(actionSource, eventSource, dataObject, actionRef, referrer) {
    if (actionRef !== undefined) {
        const clickActionObject = actionSource.click[actionRef]
        if (clickActionObject === undefined) {
            error("ClickActionNotFound: `" + actionRef + "` in actionSource.click. Info: { " + referrer + " }")
        } else {

            if (clickActionObject.type !== WebCardNavigation) {
                error("ActionTypeError: " + clickActionObject.type + ". Required `" + WebCardNavigation + "` | Info: " + referrer)
            }

            if (clickActionObject.webCard === undefined) {
                error("MissingObject: webCard | Info: " + referrer)
            } else {
                //validate placeholders
                validatePlaceHolder(clickActionObject.webCard, dataObject, referrer + ".webCard")
            }

            validateEventRef(eventSource, clickActionObject.eventRef, dataObject, referrer)
        }
    }
}

module.exports = {
    ok,
    error,
    validateColor,
    validateStyle,
    validateDataRef,
    validateCssRef,
    validateViewActionRef,
    validateClickActionRef,
    validateEventRef
}