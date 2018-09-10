import scrollIntoView from 'dom-scroll-into-view'
import isEqual from 'lodash.isequal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import toInnerRef from '../../core/toInnerRef'
import Dropdown from '../Dropdown'
import MergeRefs from '../MergeRefs'

function getDerivedStateFromInputValue(props, inputValue) {
  // If the input is empty show all items, and highlight the current value.
  let visibleItems = props.items
  let highlightedItem = Array.isArray(props.value)
    ? props.value[0]
    : props.value

  if (inputValue) {
    visibleItems = props.items.filter(item =>
      props.matchItem(item, inputValue, {
        getItemLabel: props.getItemLabel,
        getItemValue: props.getItemValue,
      }),
    )

    highlightedItem = visibleItems.length ? visibleItems[0] : null
  }

  return {
    highlightedItem,
    inputValue,
    visibleItems,
  }
}

/**
 * [props-multiple]: #multiple-boolean-optional
 * [props-value]: #value-anyarray-optional
 * [props-getitemvalue]: #getitemvalue-function
 * [props-getitemlabel]: #getitemlabel-function
 * [props-manualprops]: #manualprops-boolean-optional
 *
 * Render a select component.
 *
 * ## Usage
 *
 * ```jsx
 * import React, { Component } from 'react'
 * import { Select } from 'react-behave'
 *
 * const items = [
 *   { value: 'apple', label: 'Apple' },
 *   { value: 'blueberry', label: 'Blueberry' },
 *   { value: 'grapefruit', label: 'Grapefruit' },
 *   // ...
 * ]
 *
 * class App extends Component {
 *   state = {
 *     value: items[0],
 *   }
 *
 *   handleChange = value => {
 *     this.setState({ value })
 *   }
 *
 *   render() {
 *     return (
 *       <Select
 *         items={items}
 *         value={this.state.value}
 *         onChange={this.handleChange}
 *         getItemLabel={item => item.label}
 *         getItemValue={item => item.value}
 *       />
 *     )
 *   }
 * }
 * ```
 */
class Select extends Component {
  static propTypes = {
    /**
     * Whether or not to allow filtering the items.
     * If `true`, an input used as filter will be rendered in the dropdown using `props.renderInput`.
     * A filterable select will automatically open the dropdown when the user focuses the button and start typing.
     */
    filterable: PropTypes.bool,

    /**
     * _Parameters_: `item: Any`
     *
     * Invoked to get a displayable label for an item.
     */
    getItemLabel: PropTypes.func.isRequired,

    /**
     * _Parameters_: `item: Any`
     *
     * Invoked to get a unique identifier for an item.
     */
    getItemValue: PropTypes.func.isRequired,

    /** @ignore */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    /**
     * The items to display in the drop down menu.
     */
    items: PropTypes.array.isRequired,

    /**
     * Whether or not to manually add the required props in each render function.
     * If `true`, each function will receive the props as the last parameter and is responsible of applying them correctly.
     *
     * This is an escape hatch if you need to add props that conflicts with the required ones.
     * See each render function for the content of this object.
     *
     * For example:
     *
     * ```jsx
     * import React, { Component } from 'react'
     * import { Select } from 'react-behave'
     *
     * const items = [
     *   { value: 'apple', label: 'Apple' },
     *   // ...
     * ]
     *
     * const dropDownStyles = {
     *   backgroundColor: '#fff',
     *   padding: '1rem',
     * }
     *
     * class App extends Component {
     *   state = {
     *     value: items[0],
     *   }
     *
     *   handleChange = value => {
     *     this.setState({ value })
     *   }
     *
     *   handleClick = onClick => {
     *     return e => {
     *       // Do something with the event.
     *       console.log(e)
     *
     *       // Don't forget to call the handler (before or after).
     *       onClick(e)
     *     }
     *   }
     *
     *   render() {
     *     return (
     *       <Select
     *         // Set the flag.
     *         manualProps
     *         items={items}
     *         value={this.state.value}
     *         onChange={this.handleChange}
     *         getItemLabel={item => item.label}
     *         getItemValue={item => item.value}
     *         renderButton={(value, open, { onClick ...props }) => (
     *           // Merge event handlers.
     *           <button {...props} onClick={this.handleClick(onClick)}>
     *             {value ? value.label : 'Choose an option'}
     *           </button>
     *         )}
     *         renderDropdown={({ style, ...props }) => (
     *           // Merge the computed styles with some custom ones.
     *           <div {...props} style={{ ...style, ...dropDownStyles }} />
     *         )}
     *       />
     *     )
     *   }
     * }
     * ```
     *
     * If you need to merge refs, have a look at [`MergeRefs`](MergeRefs.md).
     */
    manualProps: PropTypes.bool,

    /**
     * _Parameters_: `item: Any`, `filter: String`, `context: Object`
     *
     * Invoked for each item to test whether it matches the filter.
     *
     * The `context` object contains:
     *
     * - `getItemLabel: Function`: See [`props.getItemLabel`][props-getitemlabel].
     * - `getItemValue: Function`: See [`props.getItemValue`][props-getitemvalue].
     */
    matchItem: PropTypes.func,

    /**
     * Whether or not to allow multiple values.
     * If `true` then [`props.value`][props-value] is required and must be an `Array`.
     */
    multiple: PropTypes.bool,

    /**
     * _Parameters_: `value: Any`
     *
     * Invoked each time a value has been selected.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * _Parameters_: `context: Object`, `[props]: Object`
     *
     * Invoked to generate the render tree for the button.
     *
     * The `context` object contains:
     *
     * - `getItemLabel: Function`: See [`props.getItemLabel`][props-getitemlabel].
     * - `getItemValue: Function`: See [`props.getItemValue`][props-getitemvalue].
     * - `multiple: Boolean`: See [`props.multiple`][props-multiple].
     * - `open: Boolean`: Whether the dropdown is openned or not.
     * - `value: Any|Array`: See [`props.value`][props-value].
     *
     * `props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
     * This object contains:
     *
     * - 'aria-expanded'
     * - 'aria-haspopup'
     * - `onClick`
     * - `onKeyDown`
     * - `onKeyPress`
     * - `ref`
     */
    renderButton: PropTypes.func,

    /**
     * _Parameters_: `[props]: Object`
     *
     * Invoked to generate the render tree for the dropdown.
     *
     * `props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
     * This object contains:
     *
     * - `children`
     * - `x-placement`
     * - `ref`
     * - `style`
     */
    renderDropdown: PropTypes.func,

    /**
     * Invoked to generate the render tree for an empty item.
     * Only called when `props.filterable` is `true` and no items match the filter.
     */
    renderEmpty: PropTypes.func,

    /**
     * _Parameters_: `[props]: Object`
     *
     * Invoked to generate the render tree for an input.
     * Only called when `props.filterable` is `true`.
     *
     * `props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
     * This object contains:
     *
     * - `key`
     * - `onKeyDown`
     * - `onChange`
     * - `ref`
     * - `value`
     */
    renderInput: PropTypes.func,

    /**
     * _Parameters_: `context: Object`, `[props]: Object`
     *
     * Invoked for each item to generate the render tree for each item.
     *
     * The `context` object contains:
     *
     * - `getItemLabel: Function`: See [`props.getItemLabel`][props-getitemlabel].
     * - `getItemValue: Function`: See [`props.getItemValue`][props-getitemvalue].
     * - `isHighlighted: Boolean`: Whether the item is being highlighted or not.
     * - `isValue: Boolean`: Whether the item is a value or not.
     * - `item: Any`: The item to render.
     *
     * `props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
     * This object contains:
     *
     * - `key`
     * - `onClick`
     * - `onMouseEnter`
     * - `onMouseLeave`
     * - `ref`
     */
    renderItem: PropTypes.func,

    /**
     * _Parameters_: `[props]: Object`
     *
     * Invoked to generate the render tree for the items list.
     *
     * `props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
     * This object contains:
     *
     * - `children`
     * - `key`
     * - `onKeyDown`
     * - `ref`
     * - `role`
     * - `tabIndex`
     */
    renderItems: PropTypes.func,

    /**
     * The current value(s).
     * If [`props.multiple`][props-multiple] is `true`, then `props.value` must be an `Array`.
     */
    value: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  }

  static defaultProps = {
    filterable: false,
    manualProps: false,
    multiple: false,

    matchItem(item, filter, { getItemLabel }) {
      const label = getItemLabel(item)
      return label.toLowerCase().includes(filter.toLowerCase())
    },

    renderButton({ getItemLabel, value }, props = {}) {
      return (
        <button {...props}>
          {value ? getItemLabel(value) : 'Choose an option'}
        </button>
      )
    },

    renderDropdown(props = {}) {
      return <div {...props} />
    },

    renderEmpty() {
      return <li>No options.</li>
    },

    renderInput(props = {}) {
      return <input {...props} />
    },

    renderItem({ getItemLabel, item }, props = {}) {
      return <li {...props}>{getItemLabel(item)}</li>
    },

    renderItems(props = {}) {
      return <ul {...props} />
    },
  }

  _buttonRef = React.createRef()
  _itemsRef = React.createRef()
  _inputRef = React.createRef()
  _highlightedItemRef = React.createRef()

  // Flag used to trigger the scroll in `componentDidUpdate`.
  // Don't use state to avoid useless updates when the flag is turned off in `componentDidUpdate`.
  _ensureScroll = false

  // Flag used to give the focus back to the button when the drop down is closed.
  // Don't use state to avoid useless updates when the flag is turned off in `componentDidUpdate`.
  _focusBackButton = false

  // Flag used to call `_scheduleUpdateCb` when the list of item has changed after a filter.
  // Don't use state to avoid useless updates when the flag is turned off in `componentDidUpdate`.
  _scheduleUpdate = false
  _scheduleUpdateCb = null

  state = {
    highlightedItem: null,
    inputValue: '',
    open: false,
    propsItems: [],
    visibleItems: [],
  }

  static getDerivedStateFromProps(props, state) {
    // If the items change we close the drop down.
    // We don't want the user to select the wrong value because we updated the list.
    if (!isEqual(props.items, state.propsItems)) {
      return {
        highlightedItem: props.value,
        inputValue: '',
        open: false,
        propsItems: props.items,
        visibleItems: props.items,
      }
    }

    return null
  }

  componentDidUpdate(_, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        // When the drop down just opened, we want to focus either the items list or the input.
        const ref = this.props.filterable
          ? // Pass the focus to the input.
            this._inputRef.current
          : // Pass the focus to the items list.
            this._itemsRef.current

        // TODO:  `setTimeout` is required somehow.
        setTimeout(() => ref.focus(), 0)

        // Ensure that the highlighted item (the current value as we just opened the drop down) is visible.
        this.ensureScrollPosition()
      } else {
        // When the drop down closes, give the focus back to the button if needed.
        if (this._focusBackButton) {
          this._buttonRef.current.focus()
          this._focusBackButton = false
        }
      }

      return
    }

    // Still open and should scroll
    if (this.state.open && this._ensureScroll) {
      this.ensureScrollPosition()
      this._ensureScroll = false
    }

    if (this.state.open && this._scheduleUpdate) {
      this._scheduleUpdateCb()
      this._scheduleUpdate = false
    }
  }

  handleClickOutside = () => {
    this.closeDropDown()
  }

  handleButtonKeyDown = e => {
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !this.state.open) {
      this.openDropDown()
      e.preventDefault()
    }
  }

  handleButtonKeyPress = e => {
    // When a user presses a key, we want to open the the drop down and set the input with the value of the key pressed.
    // Enter and Space keys triggers the `onClick` of a button so we shouldn't handle them here.
    // Every other key triggers this behaviour.
    // Only in filterable mode.
    if (this.props.filterable && e.key !== 'Enter' && e.key !== ' ') {
      e.preventDefault()
      this.openDropDown(e.key)
    }
  }

  handleButtonClick = e => {
    if (this.state.open) {
      this.closeDropDown()
    } else {
      this.openDropDown()
    }
  }

  handleItemsOrInputKeyDown = e => {
    switch (e.key) {
      case 'Escape':
        this.closeDropDown(true)
        e.preventDefault()
        break

      case 'Tab':
        this.closeDropDown()
        break

      case 'ArrowDown':
      case 'ArrowUp':
        this.shiftSelection(e.key === 'ArrowDown' ? 1 : -1)
        e.preventDefault()
        break

      case 'Enter':
        this.notifyChange(this.state.highlightedItem)
        e.preventDefault()
        break

      default:
        break
    }
  }

  handleClickItem = item => {
    this.notifyChange(item)
  }

  handleMouseEnterItem = item => {
    this.setState({ highlightedItem: item })
  }

  handleMouseLeaveItem = () => {
    if (this.state.highlightedItem) {
      this.setState({ highlightedItem: null })
    }
  }

  handleInputChange = e => {
    this._ensureScroll = true
    this._scheduleUpdate = true
    this.setState(getDerivedStateFromInputValue(this.props, e.target.value))
  }

  ensureScrollPosition() {
    const { current } = this._highlightedItemRef

    // Can be undefined if there are no visible items.
    if (current) {
      scrollIntoView(current, this._itemsRef.current, {
        onlyScrollIfNeeded: true,
      })
    }
  }

  notifyChange(item) {
    if (item) {
      const itemValue = this.props.getItemValue(item)

      if (this.props.multiple) {
        let value = this.props.value.filter(
          i => this.props.getItemValue(i) !== itemValue,
        )

        // The item was not in the values.
        if (value.length === this.props.value.length) {
          value = value.concat(item)
        }

        this.props.onChange(value)
      } else {
        // Alway close the drop down and give the focus back to the button.
        this.closeDropDown(true)

        // ...But only notify if the value actually changed.
        if (
          !this.props.value ||
          itemValue !== this.props.getItemValue(this.props.value)
        ) {
          this.props.onChange(item)
        }
      }
    }
  }

  closeDropDown(focusBackButton = false) {
    this._focusBackButton = focusBackButton
    this.setState({ open: false })
  }

  // `inputValue` is defined when the focus is on the button and the user presses a key.
  openDropDown(inputValue = '') {
    this.setState({
      open: true,
      ...getDerivedStateFromInputValue(this.props, inputValue),
    })
  }

  shiftSelection(offset) {
    this.setState(({ highlightedItem, visibleItems }) => {
      if (visibleItems.length) {
        this._ensureScroll = true

        if (!highlightedItem) {
          return { highlightedItem: visibleItems[0] }
        }

        const highlightedItemValue = this.props.getItemValue(highlightedItem)
        const highlightedItemIndex = visibleItems.findIndex(
          item => this.props.getItemValue(item) === highlightedItemValue,
        )

        let newHighlightedItemIndex =
          (highlightedItemIndex + offset) % visibleItems.length

        if (newHighlightedItemIndex < 0) {
          newHighlightedItemIndex = visibleItems.length - 1
        }

        return {
          highlightedItem: visibleItems[newHighlightedItemIndex],
        }
      }

      return null
    })
  }

  renderButton(ref) {
    const context = {
      value: this.props.value,
      open: this.state.open,
      multiple: this.props.multiple,
      getItemValue: this.props.getItemValue,
      getItemLabel: this.props.getItemLabel,
    }

    const props = {
      ref,
      onClick: this.handleButtonClick,
      onKeyDown: this.handleButtonKeyDown,
      onKeyPress: this.handleButtonKeyPress,
      'aria-haspopup': true,
      'aria-expanded': this.state.open,
    }

    if (this.props.manualProps) {
      return this.props.renderButton(context, props)
    }

    return React.cloneElement(this.props.renderButton(context), props)
  }

  renderItems() {
    const highlightedItemValue = this.state.highlightedItem
      ? this.props.getItemValue(this.state.highlightedItem)
      : ''

    const children = this.state.visibleItems.map(item => {
      const itemValue = this.props.getItemValue(item)

      let isValue = false
      if (this.props.multiple) {
        isValue = this.props.value.some(
          i => this.props.getItemValue(i) === itemValue,
        )
      } else if (this.props.value) {
        isValue = itemValue === this.props.getItemValue(this.props.value)
      }

      const context = {
        item,
        isValue,
        isHighlighted:
          this.state.highlightedItem &&
          this.props.getItemValue(this.state.highlightedItem) === itemValue,
        getItemValue: this.props.getItemValue,
        getItemLabel: this.props.getItemLabel,
      }

      const itemProps = {
        ref:
          itemValue === highlightedItemValue ? this._highlightedItemRef : null,
        key: itemValue,
        onClick: () => this.handleClickItem(item),
        onMouseEnter: () => this.handleMouseEnterItem(item),
        onMouseLeave: this.handleMouseLeaveItem,
      }

      if (this.props.manualProps) {
        return this.props.renderItem(context, itemProps)
      }

      const renderedItem = this.props.renderItem(context)
      return React.cloneElement(renderedItem, itemProps)
    })

    const props = {
      ref: this._itemsRef,
      key: 'items',
      tabIndex: 0,
      onKeyDown: this.handleItemsOrInputKeyDown,
      role: 'menu',
    }

    const empty = children.length === 0 ? this.props.renderEmpty() : null

    if (this.props.manualProps) {
      return this.props.renderItems({ ...props, children: empty || children })
    }

    if (empty) {
      children.push(empty)
    }

    return React.cloneElement(this.props.renderItems(), props, ...children)
  }

  renderDropdown(open, props, scheduleUpdateCb) {
    this._scheduleUpdateCb = scheduleUpdateCb

    if (!open) {
      return null
    }

    const children = [this.renderItems()]

    if (this.props.filterable) {
      const inputProps = {
        ref: this._inputRef,
        key: 'input',
        onKeyDown: this.handleItemsOrInputKeyDown,
        onChange: this.handleInputChange,
        value: this.state.inputValue,
      }

      const input = this.props.manualProps
        ? this.props.renderInput(inputProps)
        : React.cloneElement(this.props.renderInput(), inputProps)

      children.unshift(input)
    }

    if (this.props.manualProps) {
      return this.props.renderDropdown({ ...props, children })
    }

    return React.cloneElement(this.props.renderDropdown(), props, ...children)
  }

  render() {
    return (
      <Dropdown
        onClickOutside={this.handleClickOutside}
        open={this.state.open}
        renderDropdown={({ open, placement, ref, scheduleUpdate, style }) =>
          this.renderDropdown(
            open,
            { 'x-placement': placement, ref, style },
            scheduleUpdate,
          )
        }
      >
        {ref => (
          <MergeRefs refs={[ref, this._buttonRef, this.props.innerRef]}>
            {ref => this.renderButton(ref)}
          </MergeRefs>
        )}
      </Dropdown>
    )
  }
}

export default toInnerRef(Select)
