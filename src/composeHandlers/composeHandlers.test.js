import { composeHandlers } from './composeHandlers'

describe('composeHandlers', () => {
  it('should return a function that calls the handlers', () => {
    const handlers = [jest.fn(), jest.fn(), jest.fn()]
    const event = {}

    const composed = composeHandlers(handlers)
    composed(event)

    handlers.forEach(handler => {
      expect(handler).toHaveBeenCalledWith(event)
    })
  })

  it('should return a function that ignores falsy handlers', () => {
    const handler = jest.fn()
    const event = {}

    const composed = composeHandlers([null, undefined, 0, false, '', handler])
    composed(event)

    expect(handler).toHaveBeenCalledWith(event)
  })
})
