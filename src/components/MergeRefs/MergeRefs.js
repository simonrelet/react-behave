import PropTypes from 'prop-types'
import React from 'react'
import setRef from './setRef'

/**
 * [callback-refs]: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 * [create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref
 *
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
 *             {ref => <button ref={ref}>Click me</button>}
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
    this.props.refs.forEach(handler => {
      setRef(ref, handler)
    })
  }

  render() {
    return this.props.children(this.mergeRefs)
  }
}

MergeRefs.propTypes = {
  /**
   * _Parameters_: `ref: Function`
   *
   * Render the component.
   */
  children: PropTypes.func.isRequired,

  /**
   * Array of refs.
   * Each ref can either be a [callback ref][callback-refs] or an object created with [`React.createRef`][create-ref].
   */
  refs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
}

export default MergeRefs
