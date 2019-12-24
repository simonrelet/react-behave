import { callHandlers } from './callHandlers'

describe('callHandlers', () => {
  it('should call the handlers', () => {
    const handlers = [jest.fn(), jest.fn(), jest.fn()]
    const event = {}
    callHandlers(event, handlers)

    handlers.forEach(handler => {
      expect(handler).toHaveBeenCalledWith(event)
    })
  })

  it('should ignore falsy handlers', () => {
    const handler = jest.fn()
    const event = {}
    callHandlers(event, [null, undefined, 0, false, '', handler])

    expect(handler).toHaveBeenCalledWith(event)
  })
})
