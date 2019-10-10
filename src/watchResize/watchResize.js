import throttle from 'lodash.throttle'
import ResizeObserver from 'resize-observer-polyfill'

// Corresponds to 1 frame
const DEFAULT_RESIZE_INTERVAL = 16

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
