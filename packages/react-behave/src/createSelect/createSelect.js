import { getOtherProps, toInnerRef } from '@simonrelet/react-utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DropDown from '../DropDown';
import MergeRefs from '../MergeRefs';

function createSelect(Button, List) {
  class Select extends Component {
    buttonRef = React.createRef();

    static propTypes = {
      dense: PropTypes.bool,
      filterable: PropTypes.bool,
      innerRef: PropTypes.any,
      onChange: PropTypes.func.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ).isRequired,
      value: PropTypes.string,
    };

    static defaultProps = {
      dense: false,
      filterable: false,
    };

    state = {
      open: false,
      initialFilterValue: '',
    };

    handleKeyDown = e => {
      switch (e.key) {
        case 'Escape':
          this.closeDropDown(true);
          e.preventDefault();
          break;

        case 'Tab':
          this.closeDropDown();
          break;

        case 'ArrowDown':
        case 'ArrowUp':
          if (!this.state.open) {
            this.openDropDown();
            e.preventDefault();
          }
          break;

        default:
          break;
      }
    };

    handleKeyPress = e => {
      // Enter and Space keys triggers the `onClick` of a button so we shouldn't
      // handle them here.
      if (this.props.filterable && e.key !== 'Enter' && e.key !== ' ') {
        this.openDropDown(e.key);
      }
    };

    handleChange = value => {
      this.closeDropDown(true);
      this.props.onChange(value);
    };

    handleClickOutside = () => {
      this.closeDropDown();
    };

    closeDropDown = keepFocus => {
      this.setState({ open: false, initialFilterValue: '' });
      if (keepFocus) {
        setTimeout(() => this.buttonRef.current.focus(), 0);
      }
    };

    openDropDown = (initialFilterValue = '') => {
      this.setState({ open: true, initialFilterValue });
    };

    toggleDropDown = () => {
      this.setState(({ open }) => ({ open: !open, initialFilterValue: '' }));
    };

    getCurrentLabel() {
      const { value, options } = this.props;
      const currentOption = options.find(option => option.key === value);
      return currentOption ? currentOption.label : '';
    }

    render() {
      const { initialFilterValue, open } = this.state;
      const { dense, filterable, innerRef, options, value } = this.props;

      const otherProps = getOtherProps(Select, this.props);

      return (
        <DropDown
          onClickOutside={this.handleClickOutside}
          open={open}
          render={({ ref, style }) => (
            <List
              autofocusFilter
              dense
              filterable={filterable}
              initialFilterValue={initialFilterValue}
              items={options}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              ref={ref}
              style={style}
              value={value}
            />
          )}
        >
          {({ ref }) => (
            <MergeRefs refs={[ref, this.buttonRef, innerRef]}>
              {({ ref }) => (
                <Button
                  {...otherProps}
                  dense={dense}
                  onClick={this.toggleDropDown}
                  onKeyDown={this.handleKeyDown}
                  onKeyPress={this.handleKeyPress}
                  open={open}
                  ref={ref}
                >
                  {this.getCurrentLabel()}
                </Button>
              )}
            </MergeRefs>
          )}
        </DropDown>
      );
    }
  }

  return toInnerRef(Select);
}

export default createSelect;
