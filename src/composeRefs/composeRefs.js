import { setRefs } from '../setRefs'

export function composeRefs(handlers) {
  let element = undefined

  return {
    get current() {
      return element
    },

    set current(value) {
      setRefs(value, handlers)
      element = value
    },
  }
}
