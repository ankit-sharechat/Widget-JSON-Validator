const {WebCardNavigation} = require("./constants");
const {error, onActionSourceReferred} = require("./helpers");
const {validatePlaceHolder} = require("./dataValidator");
const {validateEventRef} = require("./eventValidator");
const {validateEventObject} = require("./eventValidator");
const {ViewActionNotFound, ClickActionNotFound, InvalidClickActionType, MissingField} = require("./errorMessage");

function validateViewActionRef(actionSource, eventSource, dataSource, actionRef, referrer, dataNode) {
    if (actionSource === undefined) {
        error(MissingField.title + ": `actionSource`")
        return
    }

    if (actionSource.view === undefined) {
        error(MissingField.title + ": `actionSource.view`")
        return
    }

    if (actionRef !== undefined) {
        onActionSourceReferred(actionRef)

        if (actionSource.view[actionRef] === undefined) {
            error(ViewActionNotFound.title + ": `" + actionRef + "` in actionSource.view{}. Info: { " + referrer + " }")
        } else {
            const actionObject = actionSource.view[actionRef]
            validateEventObject(eventSource, dataSource, actionObject.eventRef, referrer + "." + actionRef, dataNode)
        }
    }
}

function validateClickActionRef(actionSource, eventSource, dataSource, actionRef, referrer, dataNode) {
    if (actionSource === undefined) {
        error(MissingField.title + ": `actionSource`")
        return
    }

    if (actionSource.click === undefined) {
        error(MissingField.title + ": `actionSource.click`")
        return
    }

    if (actionRef !== undefined) {

        onActionSourceReferred(actionRef)
        const clickActionObject = actionSource.click[actionRef]
        if (clickActionObject === undefined) {
            error(ClickActionNotFound.title + ": `" + actionRef + "` in actionSource.click. Info: { " + referrer + " }")
        } else {

            if (clickActionObject.type !== WebCardNavigation) {
                error(InvalidClickActionType.title + ": " + clickActionObject.type + ". Required `" + WebCardNavigation + "` | Info: " + referrer)
            }

            if (clickActionObject.webCard === undefined) {
                error(MissingField.title + ": `webCard` | Info: " + referrer)
            } else {
                //validate placeholders
                validatePlaceHolder(clickActionObject.webCard, dataSource, referrer, dataNode)
            }

            validateEventRef(eventSource, clickActionObject.eventRef, dataSource, referrer + " | ActionNode: actionSource.click." + actionRef + "." + clickActionObject.eventRef, dataNode)
        }
    }
}

module.exports = {validateViewActionRef, validateClickActionRef}