import { setRefs } from '../setRefs'

export function composeRefs(handlers = []) {
  return element => {
    setRefs(element, handlers)
  }
}
