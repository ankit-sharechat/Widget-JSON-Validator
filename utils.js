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
                console.log("DataSourceValidation: `"+dataRef + "` Is not in dataSource, Tree: "+referrer)
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
                console.log("CSSValidation: `"+cssRef + "` Is not in cssSource, Tree: "+referrer)
            }
        }
    },

    validateViewActionRef: function (actionSource, eventSource, actionRef, referrer) {
        if (actionRef !== undefined) {
            //Validate Css Ref is a list
            if (actionSource.view[actionRef] === undefined) {
                console.log("ViewActionValidation: `"+actionRef + "` Is not in actionSource.view{}. Tree: "+referrer)
            }
        }
    },

    validateClickActionRef: function (actionSource, eventSource, actionRef, referrer) {
        if (actionRef !== undefined) {
            //Validate Css Ref is a list
            if (actionSource.click[actionRef] === undefined) {
                console.log("ClickActionValidation: `"+actionRef + "` Is not in actionSource.click{}. Tree: "+referrer)
            }
        }
    },

    validateEventRef: function (eventSource, eventRef) {
        if (eventRef !== undefined) {
            //Validate Css Ref is a list
            if (eventSource[eventRef] === undefined) {
                console.log("EventValidation: `"+eventRef + "` Is not in eventSource")
            }
        }
    }
}