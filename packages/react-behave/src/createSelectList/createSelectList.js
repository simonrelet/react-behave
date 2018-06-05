import { getOtherProps, toInnerRef } from '@simonrelet/react-utils';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

function includes(a, b) {
  return a.toLowerCase().includes(b.toLowerCase());
}

function ensureScrollPosition(parentElement, childElement) {
  if (childElement && parentElement) {
    const bottomOverflowDistance =
      childElement.getBoundingClientRect().bottom -
      parentElement.getBoundingClientRect().bottom;

    const topOverflowDistance =
      childElement.getBoundingClientRect().top -
      parentElement.getBoundingClientRect().top;

    if (bottomOverflowDistance > 0) {
      parentElement.scrollTop += bottomOverflowDistance;
    }

    if (topOverflowDistance < 0) {
      parentElement.scrollTop += topOverflowDistance;
    }
  }
}

function filterItems(items, filter) {
  if (!filter) {
    return items;
  }

  return items.filter(item => includes(item.label, filter));
}

function getHoveredItem(filter, visibleItems, value) {
  if (filter) {
    return visibleItems.length ? visibleItems[0].key : null;
  }

  return value || null;
}

function createSelectList(View) {
  class SelectList extends Component {
    inputRef = React.createRef();
    itemsRef = React.createRef();
    hoveredItemRef = React.createRef();

    // Don't use the state for this as we don't want to trigger useless update
    // cycles
    ensureScroll = false;

    static propTypes = {
      autofocusFilter: PropTypes.bool,
      dense: PropTypes.bool,
      filterable: PropTypes.bool,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ).isRequired,
      initialFilterValue: PropTypes.string,
      innerRef: PropTypes.any,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    };

    static defaultProps = {
      autofocusFilter: false,
      dense: false,
      filterable: false,
      initialFilterValue: '',
      value: '',
    };

    state = {
      filter: '',
      hoveredItem: null,
      inputHasFocus: false,
      mouseIn: false,
      propsItems: [],
      visibleItems: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (!isEqual(nextProps.items, prevState.propsItems)) {
        const filter = nextProps.filterable
          ? nextProps.initialFilterValue || ''
          : '';

        const visibleItems = filterItems(nextProps.items, filter);
        const hoveredItem = getHoveredItem(
          filter,
          visibleItems,
          nextProps.value,
        );

        return {
          filter,
          hoveredItem,
          propsItems: nextProps.items,
          visibleItems,
        };
      }

      return null;
    }

    componentDidMount() {
      const inputRef = this.inputRef.current;
      if (this.props.autofocusFilter && inputRef) {
        setTimeout(() => inputRef.focus(), 0);
      }

      ensureScrollPosition(this.itemsRef.current, this.hoveredItemRef.current);
    }

    componentDidUpdate() {
      if (this.ensureScroll) {
        ensureScrollPosition(
          this.itemsRef.current,
          this.hoveredItemRef.current,
        );
        this.ensureScroll = false;
      }
    }

    handleItemHover = hoveredItem => {
      this.setState({ hoveredItem, mouseIn: true });
    };

    handleMouseLeave = () => {
      this.setState({ mouseIn: false });
    };

    handleFilterBlur = () => {
      this.setState({ inputHasFocus: false });
    };

    handleFilterChange = e => {
      const { value: filter } = e.target;
      const { items, value } = this.props;

      const visibleItems = filterItems(items, filter);

      this.setState({
        filter,
        visibleItems,
        hoveredItem: getHoveredItem(filter, visibleItems, value),
      });
    };

    handleFilterFocus = () => {
      this.setState({ inputHasFocus: true });
    };

    handleFilterKeyDown = e => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          this.shiftSelection(e.key === 'ArrowDown' ? 1 : -1);
          this.ensureScroll = true;
          e.preventDefault();
          break;

        case 'Enter':
          this.notifyChange(this.state.hoveredItem);
          e.preventDefault();
          break;

        default:
          break;
      }
    };

    handleItemClick = value => {
      const inputRef = this.inputRef.current;
      if (inputRef) {
        inputRef.focus();
      }

      this.notifyChange(value);
    };

    notifyChange = value => {
      if (value && value !== this.props.value) {
        this.props.onChange(value);
      }
    };

    shiftSelection(offset) {
      this.setState(({ hoveredItem, visibleItems }) => {
        if (visibleItems.length) {
          const hoveredItemIndex = visibleItems.findIndex(
            item => item.key === hoveredItem,
          );

          let newHoveredItemIndex =
            (hoveredItemIndex + offset) % visibleItems.length;

          if (newHoveredItemIndex < 0) {
            newHoveredItemIndex = visibleItems.length - 1;
          }

          return {
            hoveredItem: visibleItems[newHoveredItemIndex].key,
          };
        }

        return null;
      });
    }

    render() {
      const { filterable, dense, innerRef, value } = this.props;
      const {
        filter,
        hoveredItem,
        inputHasFocus,
        mouseIn,
        visibleItems,
      } = this.state;

      const otherProps = getOtherProps(SelectList, this.props);

      const rootProps = {
        onMouseLeave: this.handleMouseLeave,
      };

      const filterProps = {
        onBlur: this.handleFilterBlur,
        onChange: filterable ? this.handleFilterChange : null,
        onKeyDown: this.handleFilterKeyDown,
        onFocus: this.handleFilterFocus,
        value: filter,
        ref: this.inputRef,
      };

      const itemsProps = {
        ref: this.itemsRef,
      };

      const showHoveredItem = inputHasFocus || mouseIn;

      const items = visibleItems.map(item => {
        const hovered = item.key === hoveredItem;
        return {
          hovered: showHoveredItem && hovered,
          label: item.label,
          rootProps: {
            key: item.key,
            onClick: () => this.handleItemClick(item.key),
            onMouseEnter: () => this.handleItemHover(item.key),
            ref: hovered ? this.hoveredItemRef : null,
          },
          selected: item.key === value,
        };
      });

      return (
        <View
          {...otherProps}
          filterable={filterable}
          filterProps={filterProps}
          dense={dense}
          items={items}
          itemsProps={itemsProps}
          ref={innerRef}
          rootProps={rootProps}
        />
      );
    }
  }

  return toInnerRef(SelectList);
}

export default createSelectList;
