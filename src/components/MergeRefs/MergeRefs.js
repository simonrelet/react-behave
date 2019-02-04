import PropTypes from 'prop-types'
import React from 'react'
import setRefs from '../../core/setRefs'

/**
 * Merge multiple refs on a single component.
 *
 * ## Usage
 *
 * ```jsx
 * import React from 'react'
 * import { ComponentNeedsRef } from 'some-lib'
 * import { MergeRefs } from 'react-behave'
 *
 * class App extends React.Component {
 *   buttonRef = React.createRef()
 *
 *   componentDidMount() {
 *     this.buttonRef.focus()
 *   }
 *
 *   render() {
 *     return (
 *       <ComponentNeedsRef>
 *         {requiredRef => (
 *           <MergeRefs refs={[requiredRef, this.buttonRef]}>
 *             {({ ref }) => <button ref={ref}>Click me</button>}
 *           </MergeRefs>
 *         )}
 *       </ComponentNeedsRef>
 *     )
 *   }
 * }
 * ```
 *
 * This component is an alternative of wrapping `<div />`s when you need to have multiple refs on a single component.
 */
class MergeRefs extends React.Component {
  mergeRefs = ref => {
    setRefs(ref, this.props.refs)
  }

  render() {
    return this.props.children({ ref: this.mergeRefs })
  }
}

MergeRefs.propTypes = {
  /**
   * _Parameters_: `{ ref: Function }`
   *
   * Render the component.
   */
  children: PropTypes.func.isRequired,

  /**
   * Array of refs.
   * Each ref can either be a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) or an object created with [`React.createRef`](https://reactjs.org/docs/react-api.html#reactcreateref).
   * Falsy refs are ignored.
   */
  refs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
}

export default MergeRefs
