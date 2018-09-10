import React from 'react'
import getDisplayName from './getDisplayName'

/**
 * [fr]: https://reactjs.org/docs/react-api.html#reactforwardref
 *
 * Higher order component renaming the prop `ref` to `innerRef`.
 *
 * This HOC can be seen as an abstraction over the [`React.forwardRef`][fr] API.
 *
 * ## Usage
 *
 * ```jsx
 * import React from 'react'
 * import { toInnerRef } from 'react-behave'
 *
 * const MyComponent = ({ innerRef, ...props }) => (
 *   <div ref={innerRef} {...props} />
 * )
 *
 * // Instead of:
 * // export default React.forwardRef((props, ref) => (
 * //   <MyComponent innerRef={ref} {...props} />
 * // ))
 *
 * // Simply write:
 * export default toInnerRef(MyComponent)
 * ```
 *
 * @param {React.Component} Component - The React component.
 * @returns {React.Component} The wrapping component.
 */
function toInnerRef(Component) {
  function forwardRef(props, ref) {
    return ref ? (
      <Component {...props} innerRef={ref} />
    ) : (
      <Component {...props} />
    )
  }

  forwardRef.displayName = `ToInnerRef(${getDisplayName(Component)})`

  return React.forwardRef(forwardRef)
}

export default toInnerRef
