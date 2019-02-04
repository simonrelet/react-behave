import PropTypes from 'prop-types'
import React from 'react'

/**
 * [create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref
 *
 * Notify for each click outside a component.
 *
 * ## Usage
 *
 * ```jsx
 * import React from 'react'
 * import { ClickOutside } from 'react-behave'
 *
 * class App extends React.Component {
 *   handleClickOutside(mouseEvent) {
 *     console.log('click outside', mouseEvent)
 *   }
 *
 *   handleEscape(keyEvent) {
 *     console.log('escape', keyEvent)
 *   }
 *
 *   render() {
 *     return (
 *       <ClickOutside
 *         onClickOutside={this.handleClickOutside}
 *         onEscape={this.handleEscape}
 *       >
 *         {({ ref }) => <p ref={ref}>Don't click on me.</p>}
 *       </ClickOutside>
 *     )
 *   }
 * }
 * ```
 */
class ClickOutside extends React.Component {
  elementRef = React.createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)

    if (this.props.onEscape) {
      document.addEventListener('keydown', this.handleEscape)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)

    if (this.props.onEscape) {
      document.removeEventListener('keydown', this.handleEscape)
    }
  }

  componentDidUpdate(prevProps) {
    // We register the event listener only when needed.
    if (prevProps.onEscape && !this.props.onEscape) {
      document.removeEventListener('keydown', this.handleEscape)
    } else if (!prevProps.onEscape && this.props.onEscape) {
      document.addEventListener('keydown', this.handleEscape)
    }
  }

  handleClickOutside = e => {
    const elementRef = this.elementRef.current
    if (elementRef && !elementRef.contains(e.target)) {
      this.props.onClickOutside(e)
    }
  }

  handleEscape = e => {
    if (e.key === 'Escape') {
      this.props.onEscape(e)
    }
  }

  render() {
    return this.props.children({ ref: this.elementRef })
  }
}

ClickOutside.propTypes = {
  /**
   * _Parameters_: `{ ref: Object|Function }`
   *
   * Renders the component.
   * `ref` must be passed to the component in order to work.
   */
  children: PropTypes.func.isRequired,

  /**
   * _Parameters_: `event: MouseEvent`
   *
   * Called for each click outside the component.
   */
  onClickOutside: PropTypes.func.isRequired,

  /**
   * _Parameters_: `event: KeyboardEvent`
   *
   * Called each time the Escape key is pressed.
   */
  onEscape: PropTypes.func,
}

export default ClickOutside
