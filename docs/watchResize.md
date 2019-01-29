<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/core/watchResize.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# watchResize

Watch for resizes on a target element.

## Usage

```jsx
import React, { Component } from 'react'
import { watchResize } from 'react-behave'

class App extends Component {
  ref = React.createRef()
  stopWatching = null

  componentDidMount() {
    this.stopWatching = watchResize(this.ref.current, ({ width, height }) => {
      console.log(width, height)
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
- `cb: function`: Invoked each time the target is resized. The parameter is an `Object` containing the new `height` and `width` of the `target`.
- `[options]: Object`: Options
  - `[.resizeInterval]: Number`: The minimum interval between two resizes.

**Return** `function`: A callback to stop watching.
