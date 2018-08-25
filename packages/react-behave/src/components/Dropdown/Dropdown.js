import PropTypes from 'prop-types'
import React from 'react'
import { Manager, Popper, Reference, placements } from 'react-popper'
import ClickOutside from '../ClickOutside'
import MergeRefs from '../MergeRefs'
import minWidthModifier from './minWidthModifier'

function renderContent(onClickOutside, popperProps, popperRef, renderDropDown) {
  if (!onClickOutside) {
    // Don't add the `ClickOutside` component if nobody is listening.
    return renderDropDown(popperRef, popperProps)
  }

  return (
    <ClickOutside onClickOutside={onClickOutside}>
      {clickOutsideRef => (
        <MergeRefs refs={[clickOutsideRef, popperRef]}>
          {ref => renderDropDown(ref, popperProps)}
        </MergeRefs>
      )}
    </ClickOutside>
  )
}

/**
 * [create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref
 * [react-popper]: https://github.com/FezVrasta/react-popper
 * [popper-props]: https://github.com/FezVrasta/react-popper#children
 * [popper-placements]: https://popper.js.org/popper-documentation.html#Popper.placements
 *
 * Render a dropdown around a component.
 *
 * ## Usage
 *
 * ```jsx
 * import React, { Component } from 'react';
 * import { Dropdown } from 'react-behave';
 *
 * class App extends Component {
 *   state = {
 *     open: false,
 *   };
 *
 *   handleClickOutside = () => {
 *     this.setState({ open: false });
 *   };
 *
 *   toggleDropDown = () => {
 *     this.setState(({ open }) => ({ open: !open }));
 *   };
 *
 *   render() {
 *     return (
 *       <Dropdown
 *         onClickOutside={this.handleClickOutside}
 *         open={this.state.open}
 *         renderDropDown={(ref, { style }) => (
 *           <ul ref={ref} style={style}>
 *             <li>Item 1</li>
 *             <li>Item 2</li>
 *             <li>Item 3</li>
 *           </ul>
 *         )}
 *       >
 *         {ref => (
 *           <button ref={ref} onClick={this.toggleDropDown}>
 *             Open drop down
 *           </button>
 *         )}
 *       </Dropdown>
 *     );
 *   }
 * }
 * ```
 */
function Dropdown({
  children,
  onClickOutside,
  open,
  placement,
  renderDropDown,
}) {
  return (
    <Manager>
      <Reference>{({ ref }) => children(ref)}</Reference>
      {open && (
        <Popper placement={placement} modifiers={{ minWidthModifier }}>
          {({ ref: popperRef, ...popperProps }) =>
            renderContent(
              onClickOutside,
              popperProps,
              popperRef,
              renderDropDown,
            )
          }
        </Popper>
      )}
    </Manager>
  )
}

Dropdown.propTypes = {
  /**
   * _Parameters_: `ref: Object|Function`
   *
   * Render the reference component of the dropdown.
   * `ref` must be passed to the component in order to position correctly the dropdown.
   */
  children: PropTypes.func.isRequired,

  /**
   * _Parameters_: `event: MouseEvent`
   *
   * Called for each click outside the dropdown component.
   */
  onClickOutside: PropTypes.func,

  /**
   * Whether the dropdown should be opened or not.
   */
  open: PropTypes.bool,

  /**
   * Placement of the dropdown.
   *
   * Must be one of [PopperJS's placement][popper-placements].
   */
  placement: PropTypes.oneOf(placements),

  /**
   * _Parameters_: `ref: Object|Function`, `popperProps: Object`
   *
   * Render the dropdown.
   * `ref` must be passed to the component in order to position correctly the dropdown.
   * `popperProps` is the object containing styles for positioning that need to be applied on the dropdown component.
   * This object is the same as the [one provided by react-popper][popper-props] without the `ref`.
   */
  renderDropDown: PropTypes.func.isRequired,
}

Dropdown.defaultProps = {
  open: false,
  placement: 'bottom-start',
}

export default Dropdown
