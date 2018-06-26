import { getDisplayName, setRef } from '@simonrelet/react-utils';
import React from 'react';

// Workaround the fact the `innerRef` expected by react-jss must be a function
// So here we wrap the `innerRef`object using `MergeRefs`.
function toFunctionInnerRef(Component) {
  class ToFunctionInnerRef extends React.Component {
    refFunction = ref => {
      if (this.props.innerRef) {
        setRef(ref, this.props.innerRef);
      }
    };

    render() {
      const { innerRef, ...props } = this.props;
      return (
        <Component {...props} innerRef={innerRef ? this.refFunction : null} />
      );
    }
  }

  const displayName = getDisplayName(Component);
  ToFunctionInnerRef.displayName = `ToFunctionInnerRef(${displayName})`;

  return ToFunctionInnerRef;
}

export default toFunctionInnerRef;
