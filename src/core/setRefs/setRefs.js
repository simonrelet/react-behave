/**
 * Set the ref for all the supplied handlers.
 * Each handler can either be a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) or an object created with [`React.createRef`](https://reactjs.org/docs/react-api.html#reactcreateref).
 *
 * ## Usage
 *
 * ```js
 * import React from 'react'
 * import { setRefs } from 'react-behave'
 *
 * function callbackRef(ref) {
 *   console.log(ref)
 * }
 *
 * const objectRef = React.createRef()
 *
 * setRefs(document.getElementById('user'), [callbackRef, objectRef])
 * ```
 *
 * @param {HTMLElement} ref - The ref to apply.
 * @param {Array} handlers - The handlers.
 * @returns {void}
 */
function setRefs(ref, handlers = []) {
  handlers.forEach(handler => {
    // Ingore falsy handlers to allow syntaxes like:
    //
    // ```js
    // const child = React.Children.only(this.props.children)
    // return React.cloneElement(child, {
    //   ref: ref => setRefs(ref, [this.myRef, child.ref])
    // })
    // ```
    if (handler) {
      const type = typeof handler

      switch (type) {
        case 'function': {
          handler(ref)
          break
        }

        case 'object': {
          handler.current = ref
          break
        }

        default:
          throw new Error(
            `Only refs of type function and React.createRef() are supported. Got ${type}.`,
          )
      }
    }
  })
}

export default setRefs
