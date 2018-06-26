import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { getDisplayName, toInnerRef } from 'react-behave';
import injectSheet from 'react-jss';

function mergeStyle(InnerComponent) {
  const displayName = `MergedStyle(${getDisplayName(InnerComponent)})`;

  class MergedStyle extends PureComponent {
    static displayName = displayName;

    render() {
      const { classes, className, innerRef, ...otherProps } = this.props;

      const props = {
        classes: {
          ...classes,
          root: classNames(classes.root, className),
        },
        ...otherProps,
      };

      if (innerRef) {
        props.innerRef = innerRef;
      }

      return <InnerComponent {...props} />;
    }
  }

  return toInnerRef(MergedStyle);
}

function injectStyles(...args) {
  return InnerComponent => {
    // Workaround until ref supported has been released
    // https://github.com/cssinjs/react-jss/pull/239
    return toInnerRef(injectSheet(...args)(mergeStyle(InnerComponent)));
  };
}

export default injectStyles;
