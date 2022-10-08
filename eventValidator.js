const {error, onEventSourceReferred} = require("./helpers");
const {validatePlaceHolder} = require("./dataValidator");

function validateEventObject(eventSource, dataSource, eventRef, referrer, dataNode) {
    if (eventRef !== undefined && eventSource !== undefined) {
        onEventSourceReferred(eventRef)
        if (eventSource[eventRef] !== undefined) {
            validatePlaceHolder(eventSource[eventRef], dataSource, referrer + " | EventNode: eventSource." + eventRef, dataNode)
        }
    }
}

function validateEventRef(eventSource, eventRef, dataSource, referrer, dataNode) {
    if (eventRef !== undefined && eventSource !== undefined) {
        //Validate event Ref is a list
        if (eventSource[eventRef] === undefined) {
            error("EventNotFound: `" + eventRef + "` in eventSource | Info: " + referrer)
        } else {
            //validate placeholder
            validatePlaceHolder(eventSource[eventRef], dataSource, referrer, dataNode)
        }
    }
}

module.exports = {validateEventObject, validateEventRef}