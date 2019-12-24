export function getScreenSize(screenSizes, width) {
  let bestMatch = null

  Object.entries(screenSizes).forEach(([screenSize, rangeStart]) => {
    if (
      rangeStart <= width &&
      (bestMatch == null || rangeStart > screenSizes[bestMatch])
    ) {
      bestMatch = screenSize
    }
  })

  return bestMatch
}
