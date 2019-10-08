import throttle from 'lodash.throttle'
import ResizeObserver from 'resize-observer-polyfill'

// Corresponds to 10 frames at 60 Hz
const DEFAULT_RESIZE_INTERVAL = 166

export function watchResize(
  target,
  cb,
  { resizeInterval = DEFAULT_RESIZE_INTERVAL } = {},
) {
  function handleResize(entries) {
    if (entries.length) {
      cb(entries[0].contentRect)
    }
  }

  const observer = throttle(handleResize, resizeInterval)
  const resizeObserver = new ResizeObserver(observer)

  resizeObserver.observe(target)

  return () => {
    observer.cancel()
    resizeObserver.unobserve(target)
  }
}