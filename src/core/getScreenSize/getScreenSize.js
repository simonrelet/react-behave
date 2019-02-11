function getScreenSize(screenSizes, width) {
  return Object.keys(screenSizes)
    .reverse()
    .find(screenSizeName => width >= screenSizes[screenSizeName])
}

export default getScreenSize
