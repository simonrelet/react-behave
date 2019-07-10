# composeRefs

Compose the specified ref handlers into a single ref handler function.

## Usage

```js
import React from 'react'
import { composeRefs } from 'react-behave'

function MyComponent({ children }) {
  const myElement = React.useRef(null)
  const [myStateElement, setMyStateElement] = React.useState(null)
  const child = React.Children.only(children)

  return React.cloneElement(child, {
    ref: composeRefs([myElement, setMyStateElement, child.ref]),
  })
}
```

## Type signature

```js
composeRefs(handlers): (element) => void
```

**Parameters**:

- `handlers: Array`:
  The handlers to compose.
  All falsy handlers are skipped.

**Return** `Function`: A composed ref handler.
