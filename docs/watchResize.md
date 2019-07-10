# watchResize

Watch for resizes on a target element.

## Usage

```jsx
import React, { Component } from 'react'
import { watchResize } from 'react-behave'

class App extends Component {
  ref = React.createRef(null)
  stopWatching = null

  componentDidMount() {
    this.stopWatching = watchResize(this.ref.current, size => {
      console.log(size)
    })
  }

  componentWillUnmount() {
    this.stopWatching()
  }

  render() {
    return <div ref={this.ref} />
  }
}
```

## Type signature

```js
watchResize(target, cb, [options]): function
```

**Parameters**:

- `target: Object`: The target to watch.
- `cb: function`: Invoked each time the target is resized. The parameter is an [`DOMRect`](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect).
- `[options]: Object`: Options
  - `[.resizeInterval]: Number`: The minimum interval between two resizes.

**Return** `function`: A callback to stop watching.
