function callHandlers(event, handlers = []) {
  handlers.forEach(handler => {
    // Ingore falsy handlers to allow syntaxes like:
    //
    // ```js
    // const child = React.Children.only(this.props.children)
    // return React.cloneElement(child, {
    //   onClick: e => callHandlers(e, [this.handleClick, child.onClick])
    // })
    // ```
    if (handler) {
      handler(event)
    }
  })
}

export default callHandlers
