import { toInnerRef } from '@simonrelet/react-utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createSelectList } from 'react-behave';
import SearchIcon from '../icons/SearchIcon';
import injectStyles from '../injectStyles';
import SelectListItem from './SelectListItem';

function styles({ palette, spacing }) {
  return {
    root: {
      alignItems: 'stretch',
      backgroundColor: palette.background.paper,
      display: 'flex',
      fontSize: '1rem',
      flexDirection: 'column',
    },
    rootDense: {
      fontSize: '0.875rem',
    },
    header: {
      alignItems: 'center',
      borderBottom: {
        width: 1,
        style: 'solid',
        color: palette.divider,
      },
      display: 'flex',
      flex: 'none',
      padding: spacing(),
    },
    headerNoFilter: {
      border: 0,
      height: 0,
      maxHeight: 0,
      minHeight: 0,
      padding: 0,
      overflow: 'hidden',
    },
    searchIcon: {
      marginRight: spacing(),
      color: palette.text.hint,
    },
    input: {
      backgroundColor: 'inherit',
      border: 0,
      color: 'inherit',
      flex: 1,
      fontFamily: 'inherit',
      fontSize: 'inherit',
      padding: 0,
      outline: 'none',

      '&::placeholder': {
        color: palette.text.hint,
      },
    },
    items: {
      alignItems: 'stretch',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      listStyle: 'none',
      margin: 0,
      overflow: 'auto',
      padding: 0,
    },
  };
}

function SelectList({
  classes,
  filterable,
  filterProps,
  dense,
  innerRef,
  items,
  itemsProps,
  rootProps,
  ...otherProps
}) {
  const rootClassName = classNames({
    [classes.root]: true,
    [classes.rootDense]: dense,
  });

  const headerClassName = classNames({
    [classes.header]: true,
    [classes.headerNoFilter]: !filterable,
  });

  return (
    <div
      {...rootProps}
      {...otherProps}
      className={rootClassName}
      ref={innerRef}
    >
      <div className={headerClassName}>
        <SearchIcon className={classes.searchIcon} />

        <input
          {...filterProps}
          className={classes.input}
          placeholder="Filter"
        />
      </div>

      <ul {...itemsProps} className={classes.items}>
        {items.length === 0 && <SelectListItem empty />}
        {items.map(item => (
          <SelectListItem
            {...item.rootProps}
            hovered={item.hovered}
            selected={item.selected}
          >
            {item.label}
          </SelectListItem>
        ))}
      </ul>
    </div>
  );
}

SelectList.propTypes = {
  classes: PropTypes.object.isRequired,
  filterable: PropTypes.bool.isRequired,
  filterProps: PropTypes.object.isRequired,
  dense: PropTypes.bool.isRequired,
  innerRef: PropTypes.any,
  items: PropTypes.array.isRequired,
  itemsProps: PropTypes.object.isRequired,
  rootProps: PropTypes.object.isRequired,
};

export default createSelectList(injectStyles(styles)(toInnerRef(SelectList)));
