import { getDisplayName, toInnerRef } from '@simonrelet/react-utils';
import classNames from 'classnames';
import React from 'react';
import injectSheet from 'react-jss';
import toFunctionInnerRef from './toFunctionInnerRef';

function composeStyle(Component) {
  function Stylable({ classes, className, innerRef, ...otherProps }) {
    const composedClasses = {
      ...classes,
      root: classNames(classes.root, className),
    };

    return (
      <Component ref={innerRef} classes={composedClasses} {...otherProps} />
    );
  }

  Stylable.displayName = `Stylable(${getDisplayName(Component)})`;

  return toInnerRef(Stylable);
}

function injectStyles(...args) {
  return Component => {
    // Workaround until ref supported has been released
    // https://github.com/cssinjs/react-jss/pull/239

    return toInnerRef(
      toFunctionInnerRef(injectSheet(...args)(composeStyle(Component))),
    );
  };
}

export default injectStyles;
