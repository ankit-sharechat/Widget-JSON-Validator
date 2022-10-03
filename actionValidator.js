const {WebCardNavigation} = require("./constants");
const {error} = require("./index");
const {validatePlaceHolder} = require("./dataValidator");
const { validateEventRef } = require("./eventValidator");
const { validateEventObject } = require("./eventValidator");

function validateViewActionRef(actionSource, eventSource, dataObject, actionRef, referrer) {
    if (actionRef !== undefined) {
        //Validate Css Ref is a list
        if (actionSource.view[actionRef] === undefined) {
            error("ViewActionNotFound: `" + actionRef + "` in actionSource.view{}. Info: { " + referrer + " }")
        } else {
            const actionObject = actionSource.view[actionRef]
            validateEventObject(eventSource, dataObject, actionObject.eventRef, referrer + "." + actionRef)
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
                validatePlaceHolder(clickActionObject.webCard, dataObject, referrer)
            }

            validateEventRef(eventSource, clickActionObject.eventRef, dataObject, referrer + " | ActionNode: actionSource.click." + actionRef + "." + clickActionObject.eventRef)
        }
    }
}

module.exports = {validateViewActionRef, validateClickActionRef}