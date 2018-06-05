import { renderMethod } from '@simonrelet/react-utils';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EventListener from 'react-event-listener';

// Corresponds to 10 frames at 60 Hz
const RESIZE_INTERVAL = 166;

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
 *     <Responsive up="md" screenSizes={screenSizes}>
 *       <p>Only visible on medium and bigger screens</p>
 *     </Responsive>
 *   }
 * }
 * ```
 *
 * ## Screen sizes
 *
 * The screen sizes are defined in an object.
 * Each key is the name of a screen size that will be used by `down` and `up` props and the value is the starting width in pixels of this range.
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
 */
class Responsive extends Component {
  static propTypes = {
    /**
     * Children to render if the current width is satisfied by `down` and `up`.
     */
    children: PropTypes.node,

    /**
     * Maximum screen width.
     * Must be one of the `screenSizes`.
     */
    down: PropTypes.string,

    /**
     * Render function.
     * Warning: `children` takes precedence over `render` so don’t use both.
     */
    render: PropTypes.func,

    /**
     * Screen sizes to use.
     * See [Screen sizes](#screen-sizes).
     */
    screenSizes: PropTypes.object.isRequired,

    /**
     * Minimum screen width.
     * Must be one of the `screenSizes`.
     */
    up: PropTypes.string,
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
    const { children, down, render, screenSizes, up } = this.props;

    if (!width) {
      return null;
    }

    let visible = true;

    if (up) {
      visible = biggerOrEqualTo(screenSizes, up, width);
    }

    if (visible && down) {
      visible = smallerOrEqualTo(screenSizes, down, width);
    }

    return (
      <EventListener target="window" onResize={this.handleResize}>
        {visible && renderMethod({ children, render }, width)}
      </EventListener>
    );
  }
}

export default Responsive;
