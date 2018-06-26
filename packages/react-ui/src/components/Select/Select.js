import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Select as SelectBehaviour } from 'react-behave';
import injectStyles from '../../core/injectStyles';
import Button, { severities } from '../Button';
import { DropDownIcon } from '../../icons';

function styles() {
  return {
    root: {},
    iconOpen: {
      transform: 'rotate(-180deg)',
    },
  };
}

function Select({ classes, severity, ...props }) {
  return (
    <SelectBehaviour
      renderButton={(value, open) => (
        <Button
          severity={severity}
          renderIconRight={() => (
            <DropDownIcon
              className={classNames({ [classes.iconOpen]: open })}
            />
          )}
        >
          {value ? value.label : 'Choose an option'}
        </Button>
      )}
      {...props}
    />
  );
}

Select.propTypes = {
  classes: PropTypes.object.isRequired,
  severity: PropTypes.oneOf(severities),
};

export { severities };
export default injectStyles(styles)(Select);
