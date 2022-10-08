exports.validSlotTypes = ['SLOT_TXT', 'SLOT_2_LINE', 'SLOT_LOT', 'SLOT_IMG', 'SLOT_PLAY', 'SLOT_CHIP']
exports.validTemplateKeys = ['type', 'header', 'sctv', 'items', 'autoPlay', 'sctvConfig', 'itemsConfig', 'itemSource', 'cssRefs']
exports.validItemsConfigKeys = ['s', 'sp', 'tp', 'ep', 'bp', 'wp', 'w2hr', 'c']
exports.validTemplateTypes = ['SctvTemplate', 'VideoTemplate']
exports.DataSourceKey = 'DataSourceKey'
exports.SLOT_TXT = 'SLOT_TXT'
exports.SLOT_2_LINE = 'SLOT_2_LINE'
exports.SLOT_LOT = 'SLOT_LOT'
exports.SLOT_IMG = 'SLOT_IMG'
exports.SLOT_PLAY = 'SLOT_PLAY'
exports.SLOT_CHIP = 'SLOT_CHIP'
exports.HEAD = 'HEAD'
exports.ITEM_STACK = 'ITEM_STACK'
exports.ITEM_CARD = 'ITEM_CARD'
exports.WebCardNavigation = 'webCardNav'
exports.validColors = ['primary', 'secondary', 'systemBg', 'secondaryBg', 'tertiaryBg', 'separator', 'link', 'overlaySc', 'selectionOverlay', 'error', 'success', 'transparent']
exports.validTextStyle = ['heading', 'subHeader', 'title', 'body', 'bodyBold', 'subhead', 'subheadBold', 'footnote', 'footnoteBold', 'caption', 'captionBold']
exports.GENERIC_V2 = "generic_v2"
exports.widgetCriticalField = ['template', 'dataSource']
exports.validHeaderObjectKeys = ['type', 'dataRef', 'left', 'right', 'cActionRef', 'cssRefs']
exports.validTextObjectKeys = ['dataRef', 'style', 'color', 'rd', 'ld', 'cActionRef', 'cssRefs']
exports.validDrawableKeys = ['dataRef', 'cssRefs']
exports.validPlayableObjectKeys = ['gifRef', 'thumbRef', 'videoRef']
exports.validChipObjectKeys = ['imageRef', 's', 'b', 'textRef', 'color', 'style', 'cssRefs', 'cActionRef']
exports.validImageObjectKeys = ['dataRef', 'cssRefs', 'cActionRef']

exports.validTwoLineTextSlotKeys = ['type', 'top', 'bottom', 'cssRefs']
exports.validPlaySlotKeys = ['type', 'playable']
exports.validChipSlotKeys = ['type', 'chip']
exports.validTextSlotKeys = ['type', 'text']
exports.validLottieSlotKeys = ['type', 'lottie']
exports.validImageSlotKeys = ['type', 'image']


exports.BACKGROUND = 'background'
exports.PADDING = 'padding'
exports.SIZE = 'size'
exports.PADDING = 'padding'
exports.FILLHEIGHT = 'fillMaxHeight'
exports.FILLWIDTH = 'fillMaxWidth'
exports.ALPHA = 'alpha'
exports.BORDER = 'border'
exports.ROTATE = 'rotate'
exports.ELEVATION = 'elevation'
exports.ASPECT_RATIO = 'aspectRatio'
exports.GRADIENT = 'gradient'


exports.validCssType = [this.BACKGROUND,
    this.PADDING, this.SIZE, this.FILLHEIGHT, this.FILLWIDTH, this.ALPHA, this.BORDER, this.ROTATE,
    this.ELEVATION, this.ASPECT_RATIO, this.GRADIENT]

exports.validBackgroundKeys = ['type', 'color', 'shape', 'brush']
exports.validPaddingKeys = ['type', 'all', 'start', 'top', 'end', 'bottom']
exports.validSizeKeys = ['type', 's', 'w', 'h']
exports.validfillMaxHeightKeys = ['type', 'f']
exports.validfillMaxWidthKeys = ['type', 'f']
exports.validAlphaKeys = ['type', 'alpha']
exports.validBorderKeys = ['type', 'width', 'color', 'shape']
exports.validRotateKeys = ['type', 'angle']
exports.validElevationKeys = ['type', 'elevation', 'clip', 'shape']
exports.validAspectRatioKeys = ['type', 'w2hRatio', 'matchHeight']
exports.validGradientKeys = ['type', 'c', 'xr', 'yr', 'h']
