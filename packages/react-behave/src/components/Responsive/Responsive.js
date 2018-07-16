import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import ResizeObserver from '../ResizeObserver/ResizeObserver';

// Corresponds to 10 frames at 60 Hz
// Delay to next tick for tests.
const RESIZE_INTERVAL = process.env.NODE_ENV === 'test' ? 0 : 166;

function smallerOrEqualTo(screenSizes, refScreenSize, screenSize) {
  return screenSizes[screenSize] <= screenSizes[refScreenSize];
}

function biggerOrEqualTo(screenSizes, refScreenSize, screenSize) {
  return screenSizes[screenSize] >= screenSizes[refScreenSize];
}

function getScreenSize(screenSizes, width) {
  return Object.keys(screenSizes)
    .reverse()
    .find(screenSizeName => width >= screenSizes[screenSizeName]);
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
 * import React, { Component } from 'react';
 * import { Responsive } from 'react-behave';
 *
 * const screenSizes = {
 *   xs: 0,
 *   sm: 600,
 *   md: 960,
 *   lg: 1280,
 *   xl: 1920,
 * };
 *
 * class App extends Component {
 *   render() {
 *     return (
 *       <Responsive minimum="md" screenSizes={screenSizes}>
 *         <p>Only visible on medium and bigger screens</p>
 *       </Responsive>
 *     );
 *   }
 * }
 * ```
 */
class Responsive extends Component {
  static propTypes = {
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
     * import React from 'react';
     * import { Responsive } from 'react-behave';
     *
     * const screenSizes = {
     *   // [...]
     * };
     *
     * function LargeScreen() {
     *   return (
     *     <Responsive minimum="lg" screenSizes={screenSizes}>
     *       {screenSize => <p>The screen size is '{screenSize}'</p>}
     *     </Responsive>
     *   );
     * }
     * ```
     *
     * For convenience, `props.children` can also be a React element.
     * See [Usage](#usage).
     */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,

    /**
     * The target element used to compute the screen size.
     *
     * By default, `window.innerWidth` is used, but it is possible to change the target for local responsivity.
     *
     * Example:
     *
     * ```jsx
     * import React, { Component } from 'react';
     * import { Responsive } from 'react-behave';
     *
     * const screenSizes = {
     *   // [...]
     * };
     *
     * class LocallyResponsive extends Component {
     *   ref = React.createRef();
     *
     *   render() {
     *     return (
     *       <section ref={this.ref}>
     *         <Responsive target={this.ref} screenSizes={screenSizes}>
     *           {(size, width) => (
     *             <p>
     *               The size is '{size}', the width is {width}px
     *             </p>
     *           )}
     *         </Responsive>
     *       </section>
     *     );
     *   }
     * }
     * ```
     */
    target: PropTypes.object,

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
     * };
     * ```
     *
     * Define the following screen sizes:
     *
     * - `'sm'`: [0, 960[
     * - `'md'`: [960, 1280[
     * - `'lg'`: [1280, ∞[
     */
    screenSizes: PropTypes.object,
  };

  static defaultProps = {
    screenSizes: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  };

  getScreenSize = memoize(getScreenSize, isEqual);

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  handleResize = debounce(() => this.forceUpdate(), RESIZE_INTERVAL);

  renderChildren(width) {
    const screenSize = this.getScreenSize(this.props.screenSizes, width);
    let visible = true;

    if (this.props.minimum) {
      visible = biggerOrEqualTo(
        this.props.screenSizes,
        this.props.minimum,
        screenSize,
      );
    }

    if (visible && this.props.maximum) {
      visible = smallerOrEqualTo(
        this.props.screenSizes,
        this.props.maximum,
        screenSize,
      );
    }

    if (visible) {
      if (typeof this.props.children === 'function') {
        return this.props.children(screenSize, width);
      }

      return this.props.children;
    }

    return null;
  }

  render() {
    // Only use `window` if `props.target` is not specified in the props.
    if (this.props.target !== undefined) {
      return (
        <ResizeObserver target={this.props.target}>
          {({ width }) => this.renderChildren(width)}
        </ResizeObserver>
      );
    }

    return (
      <EventListener target="window" onResize={this.handleResize}>
        {this.renderChildren(window.innerWidth)}
      </EventListener>
    );
  }
}

export default Responsive;
