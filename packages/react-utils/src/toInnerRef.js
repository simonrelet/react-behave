import React from 'react';
import getDisplayName from './getDisplayName';

/**
 * Higher order component renaming the prop `ref` to `innerRef`.
 * @param {React.Component} Component - The React component.
 * @returns {React.Component} The HOC
 */
function toInnerRef(Component) {
  function ToInnerRef(props, ref) {
    return <Component {...props} innerRef={ref} />;
  }

  ToInnerRef.displayName = `ToInnerRef(${getDisplayName(Component)})`;

  return React.forwardRef(ToInnerRef);
}

export default toInnerRef;
