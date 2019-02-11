function setRefs(ref, handlers) {
  handlers.forEach(handler => {
    // Ingore falsy handlers to allow syntaxes like:
    //
    // ```js
    // const child = React.Children.only(this.props.children)
    // return React.cloneElement(child, {
    //   ref: ref => setRefs(ref, [this.myRef, child.ref])
    // })
    // ```
    if (handler) {
      const type = typeof handler

      switch (type) {
        case 'function': {
          handler(ref)
          break
        }

        case 'object': {
          handler.current = ref
          break
        }

        default:
          throw new Error(
            `Only refs of type function and React.createRef() are supported. Got ${type}.`,
          )
      }
    }
  })
}

export default setRefs
