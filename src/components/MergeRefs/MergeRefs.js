import PropTypes from 'prop-types'
import { Component } from 'react'
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
 * import React, { Component } from 'react'
 * import { ComponentNeedsRef } from 'some-lib'
 * import { MergeRefs } from 'react-behave'
 *
 * class App extends Component {
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
class MergeRefs extends Component {
  static propTypes = {
    /**
     * _Parameters_: `ref: Function`
     *
     * Render the component.
     * `ref` is either a callback ref or `null` if `props.refs` is empty or only contain falsy values.
     */
    children: PropTypes.func.isRequired,

    /**
     * Array of refs.
     * Each ref can either be a [callback ref][callback-refs] or an object created with [`React.createRef`][create-ref].
     * Falsy refs are ignored.
     */
    refs: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    ).isRequired,
  }

  state = {
    refs: [],
  }

  static getDerivedStateFromProps(props, state) {
    return {
      refs: props.refs.filter(Boolean),
    }
  }

  mergeRefs = ref => {
    this.state.refs.forEach(handler => {
      setRef(ref, handler)
    })
  }

  render() {
    // Don't pass the ref function if there is no refs.
    return this.props.children(
      this.state.refs.length > 0 ? this.mergeRefs : null,
    )
  }
}

export default MergeRefs