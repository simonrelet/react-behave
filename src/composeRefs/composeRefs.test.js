import { composeRefs } from './composeRefs'

describe('composeRefs', () => {
  it('should calls the callback ref with the ref', () => {
    const value = 'value'
    const handler = jest.fn()
    const composedRefs = composeRefs([handler])
    composedRefs.current = value
    expect(handler).toHaveBeenCalledWith(value)
  })

  it('should sets the `current` value of an object', () => {
    const value = 'value'
    const handler = { current: null }
    const composedRefs = composeRefs([handler])
    composedRefs.current = value
    expect(handler.current).toEqual(value)
  })

  it('should ignores falsy handlers', () => {
    const value = 'value'
    const handlerObject = { current: null }
    const handlerFn = jest.fn()

    const composedRefs = composeRefs([
      null,
      handlerObject,
      undefined,
      handlerFn,
      '',
      false,
    ])

    composedRefs.current = value
    expect(handlerObject.current).toEqual(value)
    expect(handlerFn).toHaveBeenCalledWith(value)
  })

  it('should act as a Ref object', () => {
    const composedRef = composeRefs([])
    const value = 'value'
    composedRef.current = value
    expect(composedRef.current).toEqual(value)
  })
})
