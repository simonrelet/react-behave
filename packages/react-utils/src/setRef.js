/**
 * Provide the reference to the handler depending on the handler's type.
 * @param {Object} ref - The reference.
 * @param {(function|Object)} handler  - The handler.
 * @throws {Error} Will throw an error for unsupported handler types.
 */
function setRef(ref, handler) {
  if (typeof handler === 'function') {
    handler(ref);
  } else if (typeof handler === 'object') {
    handler.current = ref;
  } else {
    throw new Error(
      [
        'Only refs of type `function` and `React.createRef()` are supported',
        `Got ${typeof handler}`,
      ].join('\n'),
    );
  }
}

export default setRef;
