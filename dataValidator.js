const {error} = require("./index");

function validateDataRef(dataSource, dataRef, referrer) {
    if (dataRef !== undefined) {
        //Validate Css Ref is a list
        if (dataSource[dataRef] === undefined) {
            error("DataNotFound: `" + dataRef + "` in dataSource. Info: " + referrer)
            return false
        }
        return true
    }
}

function validatePlaceHolder(jsonObject, dataObject, referrer) {
    const keys = Object.keys(jsonObject)
    keys.forEach(key => {
        const isPlaceholder = jsonObject[key].toString().startsWith("@")
        if (isPlaceholder) {
            const placeholderKey = jsonObject[key].substring(1)
            validateDataRef(dataObject, placeholderKey, "(Placehodler cannot be filled for-> " + placeholderKey + ") " + referrer)
        }
    })
}

module.exports = {validateDataRef, validatePlaceHolder}