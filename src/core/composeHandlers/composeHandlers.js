import callHandlers from '../callHandlers'

export function composeHandlers(handlers) {
  return event => {
    callHandlers(event, handlers)
  }
}
