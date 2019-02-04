import createFocusTrap from 'focus-trap'
import invariant from 'invariant'
import PropTypes from 'prop-types'
import React from 'react'
import warning from 'warning'

/**
 * Trap the focus in a sub-tree.
 *
 * ## Usage
 *
 * ```jsx
 * import React from 'react'
 * import { Modal } from 'some-lib'
 * import { FocusTrap } from 'react-behave'
 *
 * class App extends React.Component {
 *   state = { modalVisible: false }
 *
 *   open = () => {
 *     this.setState({ modalVisible: true })
 *   }
 *
 *   close = () => {
 *     this.setState({ modalVisible: false })
 *   }
 *
 *   render() {
 *     return (
 *       <>
 *         <button autoFocus onClick={open}>
 *           Open Modal
 *         </button>
 *
 *         {this.state.modalVisible && (
 *           <FocusTrap returnFocusOnDeactivate>
 *             {({ ref }) => (
 *               <Modal ref={ref}>
 *                 Here is a focus trap <a href="#1">with</a> <a href="#2">some</a>{' '}
 *                 <a href="#3">focusable</a> parts.
 *                 <br />
 *                 <button autoFocus onClick={close}>
 *                   Close
 *                 </button>
 *               </Modal>
 *             )}
 *           </FocusTrap>
 *         )}
 *       </>
 *     )
 *   }
 * }
 * ```
 */
class FocusTrap extends React.Component {
  previouslyFocusedElement = document.activeElement
  trappedElement = React.createRef()
  fallbackElement = React.createRef()
  focusTrap = null

  componentDidMount() {
    const { children, escapeDeactivates, fallbackFocus, ...rest } = this.props

    invariant(
      this.trappedElement.current,
      'The ref prop must be applied on the trapped element in order for FocusTrap to work.',
    )

    warning(
      escapeDeactivates == null,
      'The option escapeDeactivates is set to false. Simply unmount FocusTrap to deactivate the trap.',
    )

    warning(
      fallbackFocus == null,
      'Use the render prop fallbackRef instead of the fallbackFocus option.',
    )

    this.focusTrap = createFocusTrap(this.trappedElement.current, {
      ...rest,
      fallbackFocus: this.fallbackElement.current,

      // We handle the return of the focus ourself because React can move the
      // focus into a children element before this lifecycle hook (did mount) is
      // called. This means that focus-trap might try to give the focus back to
      // the wrong element.
      returnFocusOnDeactivate: false,

      // We handle the `Escape` key by unmounting the `FocusTrap` element.
      escapeDeactivates: false,
    })

    this.focusTrap.activate()
  }

  componentWillUnmount() {
    this.focusTrap.deactivate()

    if (this.previouslyFocusedElement && this.props.returnFocusOnDeactivate) {
      // For some reason if `focus` is called synchronously during the clean up,
      // the component will not be called on its `onFocus` props.
      setTimeout(() => this.previouslyFocusedElement.focus())
    }
  }

  render() {
    return this.props.children({
      ref: this.trappedElement,
      fallbackRef: this.fallbackElement,
    })
  }
}

FocusTrap.propTypes = {
  /**
   * _Parameters_: `props: Object`
   *
   * Renders the children.
   * The `props` object contains:
   *
   * - `ref: Object`:
   *   The ref to apply on the trapped element.
   *   This is required in order for the component to work.
   * - `fallbackRef: Object`: The ref to apply on the fallback element if no focusable child has been found.
   */
  children: PropTypes.func.isRequired,

  /**
   * Whether to give the focus back to the element that initialy had it.
   */
  returnFocusOnDeactivate: PropTypes.bool,
}

export default FocusTrap
