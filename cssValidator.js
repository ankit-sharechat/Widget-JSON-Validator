const {error, validateKeys, onCssSourceReferred, fieldMissing} = require("./helpers");
const {
    validCssType, BACKGROUND, PADDING, SIZE, FILLHEIGHT, FILLWIDTH, ALPHA, BORDER, ROTATE, ELEVATION, ASPECT_RATIO,
    GRADIENT, validBackgroundKeys, validPaddingKeys, validSizeKeys, validfillMaxHeightKeys, validfillMaxWidthKeys,
    validAlphaKeys, validBorderKeys, validRotateKeys, validElevationKeys, validAspectRatioKeys, validGradientKeys,
    validShapeType, ROUNDED_CORNER, CUT_CORNER, CIRCLE, validRoundedShapeKeys, validCutCornerShapeKeys,
    validCircleShapeKeys, validBrushKeys
} = require("./constants");
const {MissingField, CssNotFound, InvalidModifierType, InvalidShapeType, InvalidValue} = require("./errorMessage");
const {validateColor} = require("./colorValidator");

function validateCssRef(cssSource, cssRefs, referrer) {
    if (cssSource === undefined) {
        error(MissingField.title + ": `cssSource`")
        return
    }
    if (cssRefs !== undefined) {
        //Validate Css Ref is a list
        cssRefs.forEach(cssRef => {
            onCssSourceReferred(cssRef)
            if (cssSource[cssRef] === undefined) {
                error(CssNotFound.title + ": `" + cssRef + "` in cssSource, Info: { " + referrer + " }")
            } else {
                validateCssDefinitionList(cssSource[cssRef], "Check: cssSource." + cssRef)
            }
        })
    }
}

function validateShape(shape, referrer) {
    if (!validShapeType.includes(shape.type)) {
        error(InvalidShapeType.title + " `" + shape.type + "`, it must one of [" + validShapeType + "] | Info: " + referrer)
        return
    }
    const keys = Object.keys(shape)
    switch (shape.type) {
        case ROUNDED_CORNER:
            validateKeys(keys, validRoundedShapeKeys, referrer)
            break
        case CUT_CORNER:
            validateKeys(keys, validCutCornerShapeKeys, referrer)
            break
        case CIRCLE:
            validateKeys(keys, validCircleShapeKeys, referrer)
            break
    }
}

function validateBrush(brush, referrer) {
    if (brush.gradient === undefined) {
        error(MissingField.title + " `gradient` | Info: " + referrer)
        return
    }

    brush.gradient.forEach(color => {
        validateColor(color, referrer)
    })

    validateKeys(Object.keys(brush), validBrushKeys, referrer)
}

function validateBackground(cssDefinition, referrer) {
    if (cssDefinition.color !== undefined) {
        validateColor(cssDefinition.color, referrer)
    }
    if (cssDefinition.shape !== undefined) {
        validateShape(cssDefinition.shape, referrer)
    }
    if (cssDefinition.brush !== undefined) {
        validateBrush(cssDefinition.brush, referrer)
    }
}

function validateBorder(border, referrer) {
    if (border.color !== undefined) {
        validateColor(border.color, referrer)
    }
    if (border.shape !== undefined) {
        validateShape(border.shape, referrer)
    }
}

function validateElevation(elevation, referrer) {
    if (elevation.shape !== undefined) {
        validateShape(elevation.shape, referrer)
    }
}

function validateGradient(gradient, referrer) {
    if (gradient.c === undefined) {
        error(MissingField.title + ": `c` (Colors) | Info: " + referrer)
        return
    } else {
        gradient.c.forEach(color => {
            validateColor(color, referrer)
        })
    }

    if (gradient.h === undefined || gradient.h === 0) {
        //yr must be present
        if (gradient.yr === undefined) {
            error(MissingField.title + ": `yr`| Info: " + referrer)
        } else {
            if (gradient.yr.length != 2) {
                error(InvalidValue.title + ": `yr` must be a list of size 2, " + referrer)
            }
        }
    } else {
        //xr must be present
        if (gradient.xr === undefined) {
            error(MissingField.title + ": `xr`| Info: " + referrer)
        } else {
            if (gradient.xr.length != 2) {
                error(InvalidValue.title + ": `xr` must be a list of size 2, " + referrer)
            }
        }
    }
}

function validateCssDefinition(cssDefinition, referrer) {
    if (!validCssType.includes(cssDefinition.type)) {
        error(InvalidModifierType.title + ": `" + cssDefinition.type + "` It must be one of [" + validCssType + "]")
        return
    }

    switch (cssDefinition.type) {
        case BACKGROUND:
            validateKeys(Object.keys(cssDefinition), validBackgroundKeys, referrer + "." + cssDefinition.type)
            validateBackground(cssDefinition, referrer + "." + cssDefinition.type)
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
            validateBorder(cssDefinition, referrer + "." + cssDefinition.type)
            break
        case ROTATE:
            validateKeys(Object.keys(cssDefinition), validRotateKeys, referrer + "." + cssDefinition.type)
            break
        case ELEVATION:
            validateKeys(Object.keys(cssDefinition), validElevationKeys, referrer + "." + cssDefinition.type)
            validateElevation(cssDefinition, referrer + "." + cssDefinition.type)
            break
        case ASPECT_RATIO:
            validateKeys(Object.keys(cssDefinition), validAspectRatioKeys, referrer + "." + cssDefinition.type)
            break
        case GRADIENT:
            validateKeys(Object.keys(cssDefinition), validGradientKeys, referrer + "." + cssDefinition.type)
            validateGradient(cssDefinition, referrer + "." + cssDefinition.type)
            break
    }
}

function validateCssDefinitionList(cssDefinitionList, referrer) {
    let index = 0
    cssDefinitionList.forEach(cssDefinition => {
        validateCssDefinition(cssDefinition, "Index:" + index + ", " + referrer)
        index++
    })
}

module.exports = {validateCssRef}