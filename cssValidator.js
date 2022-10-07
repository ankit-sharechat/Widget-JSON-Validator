const {error, validateKeys} = require("./helpers");
const {
    validCssType, BACKGROUND, PADDING, SIZE, FILLHEIGHT, FILLWIDTH, ALPHA, BORDER, ROTATE, ELEVATION, ASPECT_RATIO,
    GRADIENT, validBackgroundKeys, validPaddingKeys, validSizeKeys, validfillMaxHeightKeys, validfillMaxWidthKeys,
    validAlphaKeys, validBorderKeys, validRotateKeys, validElevationKeys, validAspectRatioKeys, validGradientKeys
} = require("./constants");

function validateCssRef(cssSource, cssRefs, referrer) {
    if (cssSource === undefined) {
        error("cssSource: missing!")
        return
    }
    if (cssRefs !== undefined) {
        //Validate Css Ref is a list
        cssRefs.forEach(cssRef => {
            if (cssSource[cssRef] === undefined) {
                error("CssNotFound: `" + cssRef + "` in cssSource, Info: { " + referrer + " }")
            } else {
                validateCssDefinitionList(cssSource[cssRef], "Check: cssSource." + cssRef)
            }
        })
    }
}

function validateBackgroundValues(cssDefinition, referrer) {
//todo: fill in
}

function validateCssDefinition(cssDefinition, referrer) {
    if (!validCssType.includes(cssDefinition.type)) {
        error("InvalidModifierType: `" + cssDefinition.type + "` It must be one of [" + validCssType + "]")
        return
    }

    switch (cssDefinition.type) {
        case BACKGROUND:
            validateKeys(Object.keys(cssDefinition), validBackgroundKeys, referrer + "." + cssDefinition.type)
            //todo: validate values
            validateBackgroundValues(cssDefinition, referrer + "." + cssDefinition.type)
            break
        case PADDING:
            validateKeys(Object.keys(cssDefinition), validPaddingKeys, referrer + "." + cssDefinition.type)
            break
        case SIZE:
            validateKeys(Object.keys(cssDefinition), validSizeKeys, referrer + "." + cssDefinition.type)
            break
        case FILLHEIGHT:
            validateKeys(Object.keys(cssDefinition), validfillMaxHeightKeys, referrer + "." + cssDefinition.type)
            break
        case FILLWIDTH:
            validateKeys(Object.keys(cssDefinition), validfillMaxWidthKeys, referrer + "." + cssDefinition.type)
            break
        case ALPHA:
            validateKeys(Object.keys(cssDefinition), validAlphaKeys, referrer + "." + cssDefinition.type)
            break
        case BORDER:
            validateKeys(Object.keys(cssDefinition), validBorderKeys, referrer + "." + cssDefinition.type)
            break
        case ROTATE:
            validateKeys(Object.keys(cssDefinition), validRotateKeys, referrer + "." + cssDefinition.type)
            break
        case ELEVATION:
            validateKeys(Object.keys(cssDefinition), validElevationKeys, referrer + "." + cssDefinition.type)
            break
        case ASPECT_RATIO:
            validateKeys(Object.keys(cssDefinition), validAspectRatioKeys, referrer + "." + cssDefinition.type)
            break
        case GRADIENT:
            validateKeys(Object.keys(cssDefinition), validGradientKeys, referrer + "." + cssDefinition.type)
            break
    }
}

function validateCssDefinitionList(cssDefinitionList, referrer) {
    let index = 0
    cssDefinitionList.forEach(cssDefinition => {
        validateCssDefinition(cssDefinition, "Index:"+index+", "+referrer)
        index++
    })
}

module.exports = {validateCssRef}