import React from 'react';

/**
 * Render a component using of the defined methods.
 * @param {Object} methods - The render methods.
 * @param {React.Node} methods.children - The children of the component. Optional.
 * @param {React.Component} methods.component - A React component. Optional.
 * @param {function} methods.render - A render function. Optional.
 * @param {props} props - The props to pass down. Optional.
 * @returns {React.Element}
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
