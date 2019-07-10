import setRefs from '../setRefs'

function composeRefs(handlers = []) {
  return element => {
    setRefs(element, handlers)
  }
}

export default composeRefs
