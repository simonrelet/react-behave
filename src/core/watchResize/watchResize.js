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

function watchResize(target, cb, options = {}) {
  const opts = { ...defaultOptions, ...options }
  const observer = debounce(handleResize(target, cb), opts.resizeInterval)
  const resizeObserver = new ResizeObserver(observer)

  resizeObserver.observe(target)

  return () => {
    observer.cancel()
    resizeObserver.unobserve(target)
  }
}

export default watchResize
