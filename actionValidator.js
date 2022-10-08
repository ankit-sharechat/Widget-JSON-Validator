const {WebCardNavigation} = require("./constants");
const {error, onActionSourceReferred} = require("./helpers");
const {validatePlaceHolder} = require("./dataValidator");
const { validateEventRef } = require("./eventValidator");
const { validateEventObject } = require("./eventValidator");

function validateViewActionRef(actionSource, eventSource, dataSource, actionRef, referrer, dataNode) {
    if (actionRef !== undefined && actionSource !== undefined) {
        onActionSourceReferred(actionRef)

        if (actionSource.view[actionRef] === undefined) {
            error("ViewActionNotFound: `" + actionRef + "` in actionSource.view{}. Info: { " + referrer + " }")
        } else {
            const actionObject = actionSource.view[actionRef]
            validateEventObject(eventSource, dataSource, actionObject.eventRef, referrer + "." + actionRef, dataNode)
        }
    }
}

function validateClickActionRef(actionSource, eventSource, dataSource, actionRef, referrer, dataNode) {
    if (actionSource === undefined) {
        error("actionSource: missing!")
        return
    }
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
                validatePlaceHolder(clickActionObject.webCard, dataSource, referrer, dataNode)
            }

            validateEventRef(eventSource, clickActionObject.eventRef, dataSource, referrer + " | ActionNode: actionSource.click." + actionRef + "." + clickActionObject.eventRef, dataNode)
        }
    }
}

module.exports = {validateViewActionRef, validateClickActionRef}