import { toInnerRef } from '@simonrelet/react-utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import injectStyles from '../injectStyles';

function styles({ palette, spacing }) {
  return {
    root: {
      cursor: 'pointer',
      flex: 'none',
      padding: [spacing(), spacing(2)],
    },
    selected: {
      color: palette.primary,
    },
    hovered: {
      backgroundColor: palette.primary,
      color: palette.isLightColor(palette.primary)
        ? palette.black
        : palette.white,
    },
    empty: {
      color: palette.text.secondary,
      cursor: 'initial',
      fontSize: '0.875em',
      padding: spacing(2),
      textAlign: 'center',
    },
  };
}

function SelectListItem({
  children,
  classes,
  empty,
  hovered,
  innerRef,
  selected,
  ...otherProps
}) {
  if (empty) {
    return (
      <li className={classNames(classes.root, classes.empty)}>
        The filter doesn't match any element
      </li>
    );
  }

  const className = classNames({
    [classes.root]: true,
    [classes.selected]: selected,
    [classes.hovered]: hovered,
  });

  return (
    <li {...otherProps} ref={innerRef} className={className}>
      {children}
    </li>
  );
}

SelectListItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  empty: PropTypes.bool,
  hovered: PropTypes.bool,
  innerRef: PropTypes.any,
  selected: PropTypes.bool,
};

export default injectStyles(styles)(toInnerRef(SelectListItem));
