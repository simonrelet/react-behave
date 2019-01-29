import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import memoize from 'memoize-one'
import PropTypes from 'prop-types'
import React from 'react'
import getScreenSize from '../../core/getScreenSize'

function smallerOrEqualTo(screenSizes, refScreenSize, screenSize) {
  return screenSizes[screenSize] <= screenSizes[refScreenSize]
}

function biggerOrEqualTo(screenSizes, refScreenSize, screenSize) {
  return screenSizes[screenSize] >= screenSizes[refScreenSize]
}

/**
 * [props-minimum]: #minimum-string-optional
 * [props-maximum]: #maximum-string-optional
 * [props-screensizes]: #screensizes-object-optional
 *
 * Render content depending on the screen size.
 *
 * ## Usage
 *
 * ```jsx
 * import React from 'react'
 * import { Responsive } from 'react-behave'
 *
 * const screenSizes = {
 *   xs: 0,
 *   sm: 600,
 *   md: 960,
 *   lg: 1280,
 *   xl: 1920,
 * }
 *
 * class App extends React.Component {
 *   render() {
 *     return (
 *       <Responsive minimum="md" screenSizes={screenSizes}>
 *         <p>Only visible on medium and bigger screens</p>
 *       </Responsive>
 *     )
 *   }
 * }
 * ```
 */
class Responsive extends React.Component {
  getScreenSize = memoize(getScreenSize, isEqual)

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.handleResize.cancel()
  }

  handleResize = debounce(() => this.forceUpdate(), this.props.resizeInterval)

  render() {
    const { children, maximum, minimum, screenSizes } = this.props
    const screenSize = this.getScreenSize(screenSizes, window.innerWidth)
    let visible = true

    if (minimum) {
      visible = biggerOrEqualTo(screenSizes, minimum, screenSize)
    }

    if (visible && maximum) {
      visible = smallerOrEqualTo(screenSizes, maximum, screenSize)
    }

    if (visible) {
      if (typeof children === 'function') {
        return children(screenSize, window.innerWidth)
      }

      return children
    }

    return null
  }
}

Responsive.propTypes = {
  /**
   * _Parameters_: `screenSize: String`, `width: Number`
   *
   * Invoked to render the children.
   *
   * The children will only be rendered if the current width is satisfied by [`props.maximum`][props-maximum] and [`props.minimum`][props-minimum].
   *
   * Example:
   *
   * ```jsx
   * import React from 'react'
   * import { Responsive } from 'react-behave'
   *
   * const screenSizes = {
   *   // [...]
   * }
   *
   * function LargeScreen() {
   *   return (
   *     <Responsive minimum="lg" screenSizes={screenSizes}>
   *       {screenSize => <p>The screen size is '{screenSize}'</p>}
   *     </Responsive>
   *   )
   * }
   * ```
   *
   * For convenience, `props.children` can also be a React element.
   * See [Usage](#usage).
   */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,

  /**
   * Maximum screen width.
   * Must be one of the keys of [`props.screenSizes`][props-screensizes].
   */
  maximum: PropTypes.string,

  /**
   * Minimum screen width.
   * Must be one of the keys of [`props.screenSizes`][props-screensizes].
   */
  minimum: PropTypes.string,

  /**
   * The minimum interval between two resizes.
   */
  resizeInterval: PropTypes.number,

  /**
   * The screen sizes to use.
   * Each key is the name of a screen size that will be used by [`props.maximum`][props-maximum] and [`props.minimum`][props-minimum], and the value is the starting width in pixels of this range.
   *
   * For example:
   *
   * ```js
   * const screenSizes = {
   *   sm: 0,
   *   md: 960,
   *   lg: 1280,
   * }
   * ```
   *
   * Define the following screen sizes:
   *
   * - `'sm'`: [0, 960[
   * - `'md'`: [960, 1280[
   * - `'lg'`: [1280, ∞[
   */
  screenSizes: PropTypes.object,
}

Responsive.defaultProps = {
  // Corresponds to 10 frames at 60 Hz
  resizeInterval: 166,
  screenSizes: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}

export default Responsive
