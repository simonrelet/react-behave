import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import renderMethod from '../../core/renderMethod';

// Corresponds to 10 frames at 60 Hz
// Delay to next tick for tests.
const RESIZE_INTERVAL = process.env.NODE_ENV === 'test' ? 0 : 166;

function smallerOrEqualTo(screenSizes, refWidth, width) {
  return screenSizes[width] <= screenSizes[refWidth];
}

function biggerOrEqualTo(screenSizes, refWidth, width) {
  return screenSizes[width] >= screenSizes[refWidth];
}

function getScreenWidth(screenSizes, windowWidth) {
  return Object.keys(screenSizes)
    .reverse()
    .find(screenSizeName => windowWidth >= screenSizes[screenSizeName]);
}

/**
 * > Render content depending on the screen size.
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
 *
 * ## Screen sizes
 *
 * The screen sizes are defined in an object.
 * Each key is the name of a screen size that will be used by `maximum` and `minimum` props and the value is the starting width in pixels of this range.
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
 * - `sm`: [0, 960[
 * - `md`: [960, 1280[
 * - `lg`: [1280, ∞[
 *
 * ## Render methods
 *
 * ### `<Responsive children />`
 *
 * The children will only be rendered if the current width is satisfied by `maximum` and `minimum`.
 *
 * See the [Usage](#usage) for an example.
 *
 * ### `<Responsive render />`
 *
 * The render function will only be called if the current width is satisfied by `maximum` and `minimum`.
 * This function takes the width as first parameter.
 *
 * Warning: `<Responsive children />` takes precedence over `<Responsive render />` so don’t use both.
 *
 * Example:
 *
 * ```jsx
 * const screenSizes = {
 *   // [...]
 * };
 *
 * function LargeScreen() {
 *   return (
 *     <Responsive
 *       minimum="lg"
 *       screenSizes={screenSizes}
 *       render={width => <p>The width is '{width}'</p>}
 *     />
 *   );
 * }
 * ```
 */
class Responsive extends Component {
  static propTypes = {
    /**
     * Children to render.
     * See the [render methods](#responsive-children-).
     */
    children: PropTypes.node,

    /**
     * Maximum screen width.
     * Must be one of the `screenSizes`.
     */
    maximum: PropTypes.string,

    /**
     * Minimum screen width.
     * Must be one of the `screenSizes`.
     */
    minimum: PropTypes.string,

    /**
     * Render function.
     * See the [render methods](#responsive-render-).
     */
    render: PropTypes.func,

    /**
     * Screen sizes to use.
     * See [Screen sizes](#screen-sizes).
     */
    screenSizes: PropTypes.object.isRequired,
  };

  state = {
    screenSizes: null,
    width: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.screenSizes, state.screenSizes)) {
      return {
        screenSizes: props.screenSizes,
        width: getScreenWidth(props.screenSizes, window.innerWidth),
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  updateWidth = () => {
    const width = getScreenWidth(this.props.screenSizes, window.innerWidth);

    if (width !== this.state.width) {
      this.setState({ width });
    }
  };

  handleResize = debounce(this.updateWidth, RESIZE_INTERVAL);

  render() {
    const { width } = this.state;
    const { children, maximum, minimum, render, screenSizes } = this.props;

    let visible = true;

    if (minimum) {
      visible = biggerOrEqualTo(screenSizes, minimum, width);
    }

    if (visible && maximum) {
      visible = smallerOrEqualTo(screenSizes, maximum, width);
    }

    return (
      <EventListener target="window" onResize={this.handleResize}>
        {visible && renderMethod({ children, render }, width)}
      </EventListener>
    );
  }
}

export default Responsive;
