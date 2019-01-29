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
 *   handleClickOutside(event) {
 *     console.log('click', event)
 *   }
 *
 *   render() {
 *     return (
 *       <ClickOutside onClickOutside={this.handleClickOutside}>
 *         {ref => <p ref={ref}>Don't click on me.</p>}
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
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = e => {
    const elementRef = this.elementRef.current
    if (elementRef && !elementRef.contains(e.target)) {
      this.props.onClickOutside(e)
    }
  }

  render() {
    return this.props.children(this.elementRef)
  }
}

ClickOutside.propTypes = {
  /**
   * _Parameters_: `ref: Object|Function`
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
}

export default ClickOutside
