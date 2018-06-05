import { toInnerRef } from '@simonrelet/react-utils';
import PropTypes from 'prop-types';
import React from 'react';
import SelectList from '../SelectList';
import injectStyles from '../injectStyles';

function styles({ borderRadius, palette, shadows, spacing, zIndex }) {
  return {
    root: {
      margin: [spacing(), 0],
      zIndex: zIndex.modal,
      backgroundColor: palette.paper,
      borderRadius: borderRadius,
      display: 'flex',
      maxHeight: 274,
      boxShadow: shadows[5],
      overflow: 'hidden',
    },
  };
}

function PaperSelectList({ classes, innerRef, ...props }) {
  return <SelectList {...props} className={classes.root} ref={innerRef} />;
}

PaperSelectList.propTypes = {
  classes: PropTypes.object.isRequired,
  innerRef: PropTypes.any,
};

export default injectStyles(styles)(toInnerRef(PaperSelectList));
