import React from 'react';

/**
 * Helper function to support multiple render methods.
 *
 * ## Usage
 *
 * ```jsx
 * import React, { Component } from 'react';
 * import { renderMethod } from 'react-behave';
 *
 * class WithUser extends Component {
 *   render() {
 *     // Get the user somehow.
 *     const { user } = this.state;
 *     const { component, render } = this.props;
 *
 *     return user ? renderMethod({ component, render }, user) : null;
 *   }
 * }
 *
 * const UserName = () => <WithUser render={user => <h1>{user.name}</h1>} />;
 *
 * // If `user.email` exists:
 * const Email = ({ email }) => <span>{email}</span>;
 * const UserEmail = () => <WithUser component={Email} />;
 * ```
 *
 * ## Render methods
 *
 * The first render method defined is used:
 *
 * - `children`: Render the children unchanged (the `props` are not passed down).
 * - `component`: Render the component with the given `props`.
 * - `render`: Call the render function with the `props` as first parameter.
 *
 * @param {Object} methods - The render methods. At least one of the methods must be provided. See the [render methods](#render-methods).
 * @param {React.Node} [methods.children] - The children of the component.
 * @param {React.Component} [methods.component] - A React component.
 * @param {function} [methods.render] - A render function.
 * @param {Object} [props={}] - The props to pass down. Only passed to the `component` and `render` methods.
 * @returns {React.Element} The render tree.
 */
function renderMethod(methods, props = {}) {
  const { children, component: Component, render } = methods;

  if (!children && !Component && !render) {
    throw new Error('At least one of the render methods should be chosen.');
  }

  if (children) {
    return children;
  }

  if (Component) {
    return <Component {...props} />;
  }

  return render(props);
}

export default renderMethod;
