import setRefs from './setRefs'

describe('setRefs', () => {
  it('calls the callback ref with the ref', () => {
    const ref = 'my-ref'
    const handler = jest.fn()
    setRefs(ref, [handler])
    expect(handler).toHaveBeenCalledWith(ref)
  })

  it('sets the `current` value of an object', () => {
    const ref = 'my-ref'
    const handler = { current: null }
    setRefs(ref, [handler])
    expect(handler.current).toEqual(ref)
  })

  it('ignores falsy handlers', () => {
    const ref = 'my-ref'
    const handlerObject = { current: null }
    const handlerFn = jest.fn()
    setRefs(ref, [null, handlerObject, undefined, handlerFn, '', false])
    expect(handlerObject.current).toEqual(ref)
    expect(handlerFn).toHaveBeenCalledWith(ref)
  })

  it('throws if the handler has as unsupported type', () => {
    expect(() => setRefs({}, ['not a handler'])).toThrow()
  })
})
