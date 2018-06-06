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
