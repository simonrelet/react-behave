import { toInnerRef } from '@simonrelet/react-utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createSelect } from 'react-behave';
import Button from '../Button';
import DropDownIcon from '../icons/DropDownIcon';
import injectStyles from '../injectStyles';
import PaperSelectList from './PaperSelectList';

function styles({ palette }) {
  return {
    root: {},
    open: {
      borderColor: palette.primary,
      color: palette.primary,

      '&:hover:not(:focus)': {
        borderColor: palette.primary,
      },
    },
    iconOpen: {
      transform: 'rotate(-180deg)',
    },
  };
}

function SelectButton({ classes, innerRef, open, ...otherProps }) {
  const className = classNames(classes.root, {
    [classes.open]: open,
  });

  return (
    <Button
      {...otherProps}
      className={className}
      ref={innerRef}
      renderIconRight={({ className }) => (
        <DropDownIcon
          className={classNames(className, {
            [classes.iconOpen]: open,
          })}
        />
      )}
    />
  );
}

SelectButton.propTypes = {
  classes: PropTypes.object.isRequired,
  innerRef: PropTypes.any,
  open: PropTypes.bool.isRequired,
};

export default createSelect(
  injectStyles(styles)(toInnerRef(SelectButton)),
  PaperSelectList,
);
