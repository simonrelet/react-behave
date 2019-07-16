export function getScreenSize(screenSizes, width) {
  const entry = Object.entries(screenSizes)
    .sort((a, b) => a[1] - b[1])
    .reverse()
    .find(([, screenSizeWidth]) => width >= screenSizeWidth)

  return entry == null ? null : entry[0]
}
