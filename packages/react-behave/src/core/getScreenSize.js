/**
 * [props-screensizes]: Responsive.md#screensizes-object-optional
 *
 * Get the screen size of a given width.
 *
 * ## Usage
 *
 * ```js
 * import { getScreenSize } from 'react-behave';
 *
 * const screenSizes = {
 *   xs: 0,
 *   sm: 600,
 *   md: 960,
 *   lg: 1280,
 *   xl: 1920,
 * };
 *
 * const screenSize = getScreenSize(screenSizes, 800);
 * ```
 *
 * @param {Object} screenSizes - The screen sizes. See [`Responsive.screenSizes`][props-screensizes].
 * @param {Number} width - The width.
 * @returns {String|null} The screen size.
 */
function getScreenSize(screenSizes, width) {
  return Object.keys(screenSizes)
    .reverse()
    .find(screenSizeName => width >= screenSizes[screenSizeName]);
}

export default getScreenSize;
