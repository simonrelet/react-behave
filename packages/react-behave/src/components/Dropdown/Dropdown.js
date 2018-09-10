import PropTypes from 'prop-types'
import React from 'react'
import { Manager, Popper, Reference, placements } from 'react-popper'
import ClickOutside from '../ClickOutside'
import MergeRefs from '../MergeRefs'
import minWidthModifier from './minWidthModifier'
import getOtherProps from '../../core/getOtherProps'

function renderContent(renderDropdown, onClickOutside, props) {
  if (!onClickOutside) {
    // Don't add the `ClickOutside` component if nobody is listening.
    return renderDropdown(props)
  }

  return (
    <ClickOutside onClickOutside={onClickOutside}>
      {clickOutsideRef => (
        <MergeRefs refs={[clickOutsideRef, props.ref]}>
          {ref => renderDropdown({ ...props, ref })}
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
 * [popper-modifiers]: https://popper.js.org/popper-documentation.html#modifiers
 *
 * Render a dropdown around a component.
 *
 * ## Usage
 *
 * ```jsx
 * import React, { Component } from 'react'
 * import { Dropdown } from 'react-behave'
 *
 * class App extends Component {
 *   state = {
 *     open: false,
 *   }
 *
 *   handleClickOutside = () => {
 *     this.setState({ open: false })
 *   }
 *
 *   toggleDropDown = () => {
 *     this.setState(({ open }) => ({ open: !open }))
 *   }
 *
 *   render() {
 *     return (
 *       <Dropdown
 *         onClickOutside={this.handleClickOutside}
 *         open={this.state.open}
 *         renderDropdown={({ open, ref, style }) =>
 *           open && (
 *             <ul ref={ref} style={style}>
 *               <li>Item 1</li>
 *               <li>Item 2</li>
 *               <li>Item 3</li>
 *             </ul>
 *           )
 *         }
 *       >
 *         {ref => (
 *           <button ref={ref} onClick={this.toggleDropDown}>
 *             Open drop down
 *           </button>
 *         )}
 *       </Dropdown>
 *     )
 *   }
 * }
 * ```
 */
function Dropdown(props) {
  const otherProps = getOtherProps(Dropdown, props)
  return (
    <Manager>
      <Reference>{({ ref }) => props.children(ref)}</Reference>
      <Popper
        {...otherProps}
        placement={props.placement}
        modifiers={{ minWidthModifier, ...props.modifiers }}
      >
        {popperProps =>
          renderContent(props.renderDropdown, props.onClickOutside, {
            ...popperProps,
            open: props.open,
          })
        }
      </Popper>
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
   * Modifiers used to alter the behavior of your poppers.
   *
   * In addition to the default modifiers, `minWidthModifier` is added.
   * It ensures for top or bottom placements that the width of the dropdown is greater or equal to the width of the reference.
   *
   * See [PopperJS's modifiers][popper-modifiers].
   */
  modifiers: PropTypes.object,

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
  renderDropdown: PropTypes.func.isRequired,
}

Dropdown.defaultProps = {
  modifiers: {},
  open: false,
  placement: 'bottom-start',
}

export default Dropdown
