module.exports = {
    ok: function (msg) {
        //console.log(msg)
    },

    error: function (msg) {
        console.log(msg)
    },

    validateColor: function (color) {

    },

    validateStyle: function (style) {

    },

    validateTextDrawable: function (textDrawable) {

    },

    validateDataRef: function (dataSource, dataRef, referrer) {
        if (dataRef !== undefined) {
            //Validate Css Ref is a list
            if (dataSource[dataRef] === undefined) {
                console.log("DataNotFound: `" + dataRef + "` in dataSource. Info: { " + referrer + " }")
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
                console.log("CssNotFound: `" + cssRef + "` in cssSource, Info: { " + referrer + " }")
            }
        }
    },

    validateViewActionRef: function (actionSource, eventSource, actionRef, referrer) {
        if (actionRef !== undefined) {
            //Validate Css Ref is a list
            if (actionSource.view[actionRef] === undefined) {
                console.log("ViewActionNotFound: `" + actionRef + "` in actionSource.view{}. Info: { " + referrer + " }")
            }
        }
    },

    validateClickActionRef: function (actionSource, eventSource, actionRef, referrer) {
        if (actionRef !== undefined) {
            //Validate Css Ref is a list
            if (actionSource.click[actionRef] === undefined) {
                console.log("ClickActionNotFound: `" + actionRef + "` in actionSource.click. Info: { " + referrer + " }")
            }
        }
    },

    validateEventRef: function (eventSource, eventRef) {
        if (eventRef !== undefined) {
            //Validate Css Ref is a list
            if (eventSource[eventRef] === undefined) {
                console.log("EventNotFound: `" + eventRef + "` in eventSource")
            }
        }
    }
}