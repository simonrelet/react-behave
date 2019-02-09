import debounce from 'lodash.debounce'
import ResizeObserver from 'resize-observer-polyfill'

function handleResize(target, cb) {
  return entries => {
    if (entries.length) {
      const { width, height } = target.getBoundingClientRect()
      cb({ width, height })
    }
  }
}

const defaultOptions = {
  // Corresponds to 10 frames at 60 Hz
  resizeInterval: 166,
}

/**
 * Watch for resizes on a target element.
 *
 * ## Usage
 *
 * ```jsx
 * import React, { Component } from 'react'
 * import { watchResize } from 'react-behave'
 *
 * class App extends Component {
 *   ref = React.createRef()
 *   stopWatching = null
 *
 *   componentDidMount() {
 *     this.stopWatching = watchResize(this.ref.current, ({ width, height }) => {
 *       console.log(width, height)
 *     })
 *   }
 *
 *   componentWillUnmount() {
 *     this.stopWatching()
 *   }
 *
 *   render() {
 *     return <div ref={this.ref} />
 *   }
 * }
 * ```
 *
 * @param {Object} target - The target to watch.
 * @param {Function} cb - Invoked each time the target is resized. The parameter is an `Object` containing the new `height` and `width` of the `target`.
 * @param {Object} [options={}] - Options
 * @param {Number} [options.resizeInterval] - The minimum interval between two resizes.
 * @returns {Function} A callback to stop watching.
 */
function watchResize(target, cb, options = {}) {
  const opts = { ...defaultOptions, ...options }
  const resizeObserver = new ResizeObserver(
    debounce(handleResize(target, cb), opts.resizeInterval),
  )

  resizeObserver.observe(target)

  return () => {
    resizeObserver.unobserve(target)
  }
}

export default watchResize
