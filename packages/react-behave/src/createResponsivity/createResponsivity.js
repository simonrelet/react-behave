import { renderMethod } from '@simonrelet/react-utils';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EventListener from 'react-event-listener';

// Corresponds to 10 frames at 60 Hz
const RESIZE_INTERVAL = 166;

function createResponsivity(breakpoints) {
  const breakpointsKeys = Object.keys(breakpoints);

  function smallerOrEqualTo(refWidth, width) {
    return breakpoints[width] <= breakpoints[refWidth];
  }

  function biggerOrEqualTo(refWidth, width) {
    return breakpoints[width] >= breakpoints[refWidth];
  }

  class Responsivity extends Component {
    state = {
      width: null,
    };

    componentDidMount() {
      this.updateWidth(window.innerWidth);
    }

    componentWillUnmount() {
      this.handleResize.cancel();
    }

    updateWidth(innerWidth) {
      const width = breakpointsKeys
        .slice()
        .reverse()
        .find(breakpointsKey => innerWidth >= breakpoints[breakpointsKey]);

      if (width !== this.state.width) {
        this.setState({ width });
      }
    }

    handleResize = debounce(
      () => this.updateWidth(window.innerWidth),
      RESIZE_INTERVAL,
    );

    render() {
      const { width } = this.state;
      const { up, down, children, component, render } = this.props;

      if (!width) {
        return null;
      }

      let visible = true;

      if (up) {
        visible = biggerOrEqualTo(up, width);
      }

      if (visible && down) {
        visible = smallerOrEqualTo(down, width);
      }

      return (
        <EventListener target="window" onResize={this.handleResize}>
          {visible && renderMethod({ children, component, render }, { width })}
        </EventListener>
      );
    }
  }

  Responsivity.propTypes = {
    children: PropTypes.node,
    component: PropTypes.object,
    down: PropTypes.oneOf(breakpointsKeys),
    render: PropTypes.func,
    up: PropTypes.oneOf(breakpointsKeys),
  };

  return Responsivity;
}

export default createResponsivity;
