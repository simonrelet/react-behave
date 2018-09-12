import PropTypes from 'prop-types'
import React from 'react'
import { Popper as ReactPopper } from 'react-popper'
import getOtherProps from '../../core/getOtherProps'
import ClickOutside from '../ClickOutside'
import MergeRefs from '../MergeRefs'
import minWidthModifier from './minWidthModifier'

/**
 * [react-popper]: https://github.com/FezVrasta/react-popper
 * [popper-modifiers]: https://popper.js.org/popper-documentation.html#modifiers
 *
 * Render a popper.
 *
 * This component is a wrapper around react-popper's [`Popper`][react-popper] component.
 *
 * ## Usage
 *
 * ```jsx
 * import React from 'react'
 * import {
 *   Popper,
 *   PopperManager,
 *   PopperReference
 * } from 'react-behave'
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
 *   togglePopper = () => {
 *     this.setState({ open: !this.state.open })
 *   }
 *
 *   render() {
 *     return (
 *       <PopperManager>
 *         <PopperReference>
 *           {({ ref }) => (
 *             <button ref={ref} onClick={this.togglePopper}>
 *               Open popper
 *             </button>
 *           )}
 *         </PopperReference>
 *
 *         {this.state.open && (
 *           <Popper onClickOutside={this.handleClickOutside}>
 *             {({ ref, style, placement, arrowProps }) => (
 *               <div ref={ref} style={style} x-placement={placement}>
 *                 Popper element
 *                 <div ref={arrowProps.ref} style={arrowProps.style} />
 *               </div>
 *             )}
 *           </Popper>
 *         )}
 *       </PopperManager>
 *     )
 *   }
 * }
 * ```
 */
function Popper(props) {
  const otherProps = getOtherProps(Popper, props)
  return (
    <ReactPopper
      {...otherProps}
      modifiers={{ minWidthModifier, ...props.modifiers }}
    >
      {popperProps => {
        if (!props.onClickOutside) {
          // Don't add the `ClickOutside` component if nobody is listening.
          return props.children(popperProps)
        }

        return (
          <ClickOutside onClickOutside={props.onClickOutside}>
            {clickOutsideRef => (
              <MergeRefs refs={[clickOutsideRef, popperProps.ref]}>
                {ref => props.children({ ...popperProps, ref })}
              </MergeRefs>
            )}
          </ClickOutside>
        )
      }}
    </ReactPopper>
  )
}

Popper.propTypes = {
  /**
   * Modifiers used to alter the behavior of your poppers.
   *
   * In addition to the default modifiers, `minWidthModifier` is added.
   * It ensures for top or bottom placements that the width of the popper is greater or equal to the width of the reference.
   *
   * See [PopperJS's modifiers][popper-modifiers].
   */
  modifiers: PropTypes.object,

  /**
   * _Parameters_: `event: MouseEvent`
   *
   * Called for each click outside the popper component.
   */
  onClickOutside: PropTypes.func,

  /** @ignore */
  children: PropTypes.func.isRequired,
}

Popper.defaultProps = {
  modifiers: {},
}

export default Popper
