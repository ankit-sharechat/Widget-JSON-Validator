const {validColors, validTextStyle} = require("./constants");

function logError(msg) {
    console.log('\x1b[31m', msg);  //Red
}

function logOk(msg) {
    console.log('\x1b[32m', msg);  //Green
}

const colorHexRegex = '^#[A-Fa-f0-9]+$'
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

    validateTextDrawable: function (textDrawable) {

    },

    validateDataRef: function (dataSource, dataRef, referrer) {
        if (dataRef !== undefined) {
            //Validate Css Ref is a list
            if (dataSource[dataRef] === undefined) {
                logError("DataNotFound: `" + dataRef + "` in dataSource. Info: { " + referrer + " }")
            } else {
                return true
            }
        }
        return false
    },

    validateCssRef: function (cssSource, cssRef, referrer) {
        if (cssRef !== undefined) {
            //Validate Css Ref is a list
            if (cssSource[cssRef] === undefined) {
                logError("CssNotFound: `" + cssRef + "` in cssSource, Info: { " + referrer + " }")
            }
        }
    },

    validateViewActionRef: function (actionSource, eventSource, actionRef, referrer) {
        if (actionRef !== undefined) {
            //Validate Css Ref is a list
            if (actionSource.view[actionRef] === undefined) {
                logError("ViewActionNotFound: `" + actionRef + "` in actionSource.view{}. Info: { " + referrer + " }")
            }
        }
    },

    validateClickActionRef: function (actionSource, eventSource, actionRef, referrer) {
        if (actionRef !== undefined) {
            //Validate Css Ref is a list
            if (actionSource.click[actionRef] === undefined) {
                logError("ClickActionNotFound: `" + actionRef + "` in actionSource.click. Info: { " + referrer + " }")
            }
        }
    },

    validateEventRef: function (eventSource, eventRef) {
        if (eventRef !== undefined) {
            //Validate Css Ref is a list
            if (eventSource[eventRef] === undefined) {
                logError("EventNotFound: `" + eventRef + "` in eventSource")
            }
        }
    }
}