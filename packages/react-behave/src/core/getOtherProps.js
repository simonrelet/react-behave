import omit from 'lodash.omit';

/**
 * [pors]: https://github.com/tc39/proposal-object-rest-spread
 *
 * Extract the props that are not defined in the `propTypes` of a component.
 *
 * This is an alternative to using the [object rest spread proposal][pors] where you need to list the props to remove.
 *
 * ## Usage
 *
 * ```jsx
 * import React, { Component } from 'react';
 * import PropTypes from 'prop-types';
 * import { getOtherProps } from 'react-behave';
 *
 * class App extends Component {
 *   static propTypes = {
 *     prop1: PropTypes.string,
 *     prop2: PropTypes.func.isRequired,
 *     prop3: PropTypes.object,
 *   };
 *
 *   // Use `prop1`, `prop2`, and `prop3`.
 *
 *   render() {
 *     const otherProps = getOtherProps(App, this.props);
 *     // Instead of the object rest spread:
 *     // const { prop1, prop2, prop3, ...otherProps } = this.props;
 *     return <div {...otherProps} />;
 *   }
 * }
 * ```
 *
 * @param {React.Component} component - The React component. A `propTypes` attribute must be set on the component.
 * @param {Object} props - The props of the component.
 * @returns {Object} The other props.
 */
function getOtherProps(component, props) {
  if (component.propTypes) {
    return omit(props, Object.keys(component.propTypes));
  }
  return props;
}

export default getOtherProps;
