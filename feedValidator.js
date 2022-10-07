const {GENERIC_V2} = require("./constants");
const {
    error,
    getActionsReferred,
    getEventsReferred,
    getCssReferred,
    getDataReferred,
    getItemsReferred
} = require("./helpers");
const {validateWidget} = require("./widgetValidator");

function validateFeedItem(feedJson) {
    if (feedJson.t !== GENERIC_V2) {
        error(feedJson.t + " is not a valid type in Feed. It must be " + GENERIC_V2)
        return
    }
    validateWidget(feedJson.genericWidget)
    findUnusedSource(feedJson.genericWidget)
}


function getActualActions(actionsSource) {
    const list = []
    if (actionsSource.click !== undefined) {
        list.push(...Object.keys(actionsSource.click))
    }
    if (actionsSource.view !== undefined) {
        list.push(...Object.keys(actionsSource.view))
    }
    return list
}

function getActualEvents(eventSource) {
    const list = []
    if (eventSource !== undefined) {
        list.push(...Object.keys(eventSource))
    }
    return list
}

function getActualCssSource(cssSource) {
    const list = []
    if (cssSource !== undefined) {
        list.push(...Object.keys(cssSource))
    }
    return list
}

function getActualDataSource(dataSource) {
    const list = []
    if (dataSource !== undefined) {
        Object.keys(dataSource).forEach(key => {
            list.push(key)
            if (typeof dataSource[key] === 'object') {
                list.push(...getActualDataSource(dataSource[key]))
            }
        })
    }
    return list
}

function getActualItemSource(itemSource) {
    const list = []
    if (itemSource !== undefined) {
        list.push(...Object.keys(itemSource))
    }
    return list
}

function findUnusedSource(widgetJson) {
    const actionsReferred = getActionsReferred()
    const actualActions = getActualActions(widgetJson.actionSource)
    let unusedActions = actualActions.filter(x => !actionsReferred.includes(x));
    if (unusedActions.length !== 0) {
        error("UnsedActionsFound: [" + unusedActions + "]")
    }

    const eventsReferred = getEventsReferred()
    const actualEvents = getActualEvents(widgetJson.eventSource)
    let unusedEvents = actualEvents.filter(x => !eventsReferred.includes(x));
    if (unusedEvents.length !== 0) {
        error("UnsedEventsFound: [" + unusedEvents + "]")
    }

    const cssReferred = getCssReferred()
    const actualCss = getActualCssSource(widgetJson.cssSource)
    let unusedCss = actualCss.filter(x => !cssReferred.includes(x));
    if (unusedCss.length !== 0) {
        error("UnsedCssFound: [" + unusedCss + "]")
    }

    const dataReferred = getDataReferred()
    const actualData = getActualDataSource(widgetJson.dataSource)
    let unusedData = actualData.filter(x => !dataReferred.includes(x));
    if (unusedData.length !== 0) {
        error("UnsedDataFound: [" + unusedData + "]")
    }

    const itemsReferred = getItemsReferred()
    const actualitems = getActualItemSource(widgetJson.template.itemSource)
    let unusedItems = actualitems.filter(x => !itemsReferred.includes(x));
    if (unusedItems.length !== 0) {
        error("UnsedItemDefinitionFound: [" + unusedItems + "]")
    }
}

module.exports = {validateFeedItem}