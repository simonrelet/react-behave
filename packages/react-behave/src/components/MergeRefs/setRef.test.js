import setRef from './setRef';

describe('setRef', () => {
  it('calls the callback ref with the ref', () => {
    const ref = 'my-ref';
    const handler = jest.fn();
    setRef(ref, handler);
    expect(handler).toHaveBeenCalledWith(ref);
  });

  it('sets the `current` value of an object', () => {
    const ref = 'my-ref';
    const handler = {
      current: null,
    };
    setRef(ref, handler);
    expect(handler.current).toEqual(ref);
  });

  it('throws if the handler has as unsupported type', () => {
    const handler = 0;
    expect(() => setRef({}, handler)).toThrow();
  });
});
