import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { Component } from 'react';
import RO from 'resize-observer-polyfill';

// Corresponds to 10 frames at 60 Hz
// Delay to next tick for tests.
const RESIZE_INTERVAL = process.env.NODE_ENV === 'test' ? 0 : 166;

/**
 * [props-target]: #target-object-optional
 *
 * Observe resizes on a target element.
 *
 * ## Usage
 *
 * ```jsx
 * import React, { Component } from 'react';
 * import { ResizeObserver } from 'react-behave';
 *
 * class App extends Component {
 *   ref = React.createRef();
 *
 *   render() {
 *     return (
 *       <section ref={this.ref}>
 *         <ResizeObserver target={this.ref}>
 *           {({ height, width }) => (
 *             <p>
 *               The width is {width}px, and the height is {height}px.
 *             </p>
 *           )}
 *         </ResizeObserver>
 *       </section>
 *     );
 *   }
 * }
 * ```
 */
class ResizeObserver extends Component {
  static propTypes = {
    /**
     * _Parameters_: `size: Object`
     *
     * Invoked to render the children.
     *
     * The `size` object contains:
     *
     * - `height: Number`: The heigh of the [`props.target`][props-target].
     * - `width: Number`: The width of the [`props.target`][props-target].
     *
     * If no [`props.target`][props-target] is given, `props.children` is invoked with a width and height of `0`.
     */
    children: PropTypes.func.isRequired,

    /**
     * The target element.
     */
    target: PropTypes.object,
  };

  static getDerivedStateFromProps(props, state) {
    // We actually want to compare the references and not the values.
    // eslint-disable-next-line eqeqeq
    if (props.target != state.propsTarget) {
      if (state.propsTarget) {
        state.resizeObserver.unobserve(state.propsTarget);
      }

      if (props.target) {
        state.resizeObserver.observe(props.target);
      }

      return {
        propsTarget: props.target,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      propsTarget: null,
      resizeObserver: new RO(debounce(this.handleResize, RESIZE_INTERVAL)),
    };
  }

  componentWillUnmount() {
    if (this.props.target) {
      this.state.resizeObserver.unobserve(this.props.target);
    }
  }

  handleResize = entries => {
    if (entries.length) {
      this.forceUpdate();
    }
  };

  render() {
    let rect = { width: 0, height: 0 };

    if (this.props.target) {
      const clientRect = this.props.target.getBoundingClientRect();
      rect = {
        width: Math.floor(clientRect.width),
        height: Math.floor(clientRect.height),
      };
    }

    return this.props.children(rect);
  }
}

export default ResizeObserver;
