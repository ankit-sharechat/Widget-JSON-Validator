const {error, onDataSourceReferred} = require("./helpers");

function validateDataRef(dataSource, dataRef, referrer) {
    if (dataRef !== undefined && dataSource !== undefined) {
        onDataSourceReferred(dataRef)
        if (dataSource[dataRef] === undefined) {
            error("DataNotFound: `" + dataRef + "` in dataSource. Info: " + referrer)
            return false
        }
        return true
    }
}

function validateDataNode(dataSource, dataNode, referrer) {
    const nodes = dataNode.split(".")
    if (dataSource !== undefined) {
        onDataSourceReferred(dataNode)

        let dataObject = dataSource
        let foundTill = ""
        nodes.forEach(node => {
            if (dataObject[node] !== undefined) {
                dataObject = dataObject[node]
                foundTill = (foundTill.length === 0 ? "" : foundTill + ".") + node
            } else {
                error("DataNotFound: `" + foundTill + "." + node + "` in dataSource. Info: " + referrer)
            }
        })
        return foundTill === dataNode
    }
}

function getDataAtNode(dataSource, dataNode) {
    const nodes = dataNode.split(".")
    if (dataSource !== undefined) {
        let dataObject = dataSource
        nodes.forEach(node => {
            if (dataObject[node] !== undefined) {
                dataObject = dataObject[node]
            }
        })
        return dataObject
    }
}

function validatePlaceHolder(jsonObject, dataSource, referrer, dataNode) {
    const keys = Object.keys(jsonObject)
    keys.forEach(key => {
        const isPlaceholder = jsonObject[key].toString().startsWith("@")
        if (isPlaceholder) {
            const placeholderKey = jsonObject[key].substring(1)
            const newDataNode = dataNode + "." + placeholderKey
            validateDataNode(dataSource, newDataNode, "(Placehodler cannot be filled for-> " + placeholderKey + ") " + referrer)
        }
    })
}

module.exports = {validatePlaceHolder, validateDataNode, getDataAtNode}