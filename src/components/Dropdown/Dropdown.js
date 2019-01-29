import PropTypes from 'prop-types'
import React from 'react'
import {
  Popper,
  PopperManager,
  PopperPlacements,
  PopperReference,
} from '../Popper'

/**
 * [popper-children]: https://github.com/FezVrasta/react-popper#children
 * [popper-placements]: https://popper.js.org/popper-documentation.html#Popper.placements
 *
 * Render a dropdown around a component.
 *
 * ## Usage
 *
 * ```jsx
 * import React from 'react'
 * import { Dropdown } from 'react-behave'
 *
 * class App extends React.Component {
 *   state = {
 *     open: false,
 *   }
 *
 *   handleClickOutside = () => {
 *     this.setState({ open: false })
 *   }
 *
 *   toggleDropdown = () => {
 *     this.setState({ open: !this.state.open })
 *   }
 *
 *   render() {
 *     return (
 *       <Dropdown
 *         onClickOutside={this.handleClickOutside}
 *         open={this.state.open}
 *         renderDropdown={({ ref, style }) => (
 *           <ul ref={ref} style={style}>
 *             <li>Item 1</li>
 *             <li>Item 2</li>
 *             <li>Item 3</li>
 *           </ul>
 *         )}
 *       >
 *         {({ ref }) => (
 *           <button ref={ref} onClick={this.toggleDropdown}>
 *             Open dropdown
 *           </button>
 *         )}
 *       </Dropdown>
 *     )
 *   }
 * }
 * ```
 */
function Dropdown({ children, open, placement, renderDropdown, ...rest }) {
  return (
    <PopperManager>
      <PopperReference children={children} />
      {open && (
        <Popper {...rest} placement={placement} children={renderDropdown} />
      )}
    </PopperManager>
  )
}

Dropdown.propTypes = {
  /**
   * _Parameters_: `props: Object`
   *
   * Render the reference component of the dropdown.
   *
   * The `props` object contains:
   *
   * - `ref: Object|Function`: Must be passed to the component in order to position correctly the dropdown.
   */
  children: PropTypes.func.isRequired,

  /**
   * Whether the dropdown should be opened or not.
   */
  open: PropTypes.bool,

  /**
   * Placement of the dropdown.
   *
   * Must be one of [PopperJS's placement][popper-placements].
   */
  placement: PropTypes.oneOf(PopperPlacements),

  /**
   * _Parameters_: `popperProps: Object`
   *
   * Render the dropdown.
   *
   * See react-popper's [`Popper.children`][popper-children].
   */
  renderDropdown: PropTypes.func.isRequired,
}

Dropdown.defaultProps = {
  open: false,
  placement: 'bottom-start',
}

export default Dropdown
