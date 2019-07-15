import debounce from 'lodash.debounce'
import ResizeObserver from 'resize-observer-polyfill'

const defaultOptions = {
  // Corresponds to 10 frames at 60 Hz
  resizeInterval: 166,
}

export function watchResize(target, cb, options = {}) {
  const opts = { ...defaultOptions, ...options }

  function handleResize(entries) {
    if (entries.length) {
      cb(entries[0].contentRect)
    }
  }

  const observer = debounce(handleResize, opts.resizeInterval)
  const resizeObserver = new ResizeObserver(observer)

  resizeObserver.observe(target)

  return () => {
    observer.cancel()
    resizeObserver.unobserve(target)
  }
}
