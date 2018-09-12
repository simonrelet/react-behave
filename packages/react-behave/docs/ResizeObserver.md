<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/ResizeObserver/ResizeObserver.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# ResizeObserver

[props-target]: #target-object-optional

Observe resizes on a target element.

## Usage

```jsx
import React, { Component } from 'react'
import { ResizeObserver } from 'react-behave'

class App extends Component {
  ref = React.createRef()

  render() {
    return (
      <section ref={this.ref}>
        <ResizeObserver target={this.ref}>
          {({ height, width }) => (
            <p>
              The width is {width}
              px, and the height is {height}
              px.
            </p>
          )}
        </ResizeObserver>
      </section>
    )
  }
}
```

## Props

### `children`: `Function`

_Parameters_: `size: Object`

Invoked to render the children.

The `size` object contains:

- `height: Number`: The heigh of the [`props.target`][props-target].
- `width: Number`: The width of the [`props.target`][props-target].

If no [`props.target`][props-target] is given, `props.children` is invoked with a width and height of `0`.

### `target`: `Object` (optional)

The target element.
