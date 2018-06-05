import PropTypes from 'prop-types';
import React from 'react';
import injectStyles from '../injectStyles';

function styles() {
  return {
    root: {
      display: 'inline-block',
      fill: 'currentColor',
      flexShrink: 0,
      height: '1.5em',
      transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      userSelect: 'none',
    },
  };
}

function SVGIcon({ children, classes, viewBox, ...otherProps }) {
  return (
    <svg viewBox={viewBox} className={classes.root} {...otherProps}>
      {children}
    </svg>
  );
}

SVGIcon.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  viewBox: PropTypes.string.isRequired,
};

export default injectStyles(styles)(SVGIcon);
