const VERTICAL_REGEX = /^(top|bottom)/

const minWidthModifier = {
  enabled: true,
  fn(data) {
    const referenceWidth = Math.floor(data.offsets.reference.width)
    const dropDownWidth = Math.floor(data.offsets.popper.width)

    if (
      VERTICAL_REGEX.test(data.placement) &&
      dropDownWidth <= referenceWidth
    ) {
      data.styles.minWidth = `${referenceWidth}px`
    }

    return data
  },
  // Just after the `computeStyle` modifier (850)
  // https://popper.js.org/popper-documentation.html#modifiers..computeStyle
  order: 851,
}

export default minWidthModifier
