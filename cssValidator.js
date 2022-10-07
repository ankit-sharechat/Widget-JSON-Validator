const {error} = require("./helpers");

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
            }
        })
    }
}

module.exports = { validateCssRef }