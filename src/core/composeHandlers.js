import callHandlers from './callHandlers'

function composeHandlers(handlers = []) {
  return event => {
    callHandlers(event, handlers)
  }
}

export default composeHandlers
