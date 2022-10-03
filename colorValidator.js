const { validColors } = require("./constants");
const {error} = require("./index");

const colorHexRegex = '^#[A-Fa-f0-9]+$'

function validateColor(color, referrer) {
    if (color === undefined)
        return

    if (!(color.match(colorHexRegex) || validColors.includes(color))) {
        error("InvalidResource: Color " + color + ", It must be a valid color hex, or one of " + validColors + " Info: " + referrer)
    }
}

module.exports = { validateColor }