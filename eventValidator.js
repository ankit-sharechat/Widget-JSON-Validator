const {error} = require("./helpers");
const {validatePlaceHolder} = require("./dataValidator");

function validateEventObject(eventSource, dataObject, eventRef, referrer) {
    if (eventRef !== undefined) {
        if (eventSource[eventRef] !== undefined) {
            validatePlaceHolder(eventSource[eventRef], dataObject, referrer+" | EventNode: eventSource."+eventRef)
        }
    }
}

function validateEventRef(eventSource, eventRef, dataObject, referrer) {
    if (eventRef !== undefined) {
        //Validate event Ref is a list
        if (eventSource[eventRef] === undefined) {
            error("EventNotFound: `" + eventRef + "` in eventSource | Info: "+referrer)
        } else {
            //validate placeholder
            validatePlaceHolder(eventSource[eventRef], dataObject, referrer)
        }
    }
}

module.exports = { validateEventObject, validateEventRef }