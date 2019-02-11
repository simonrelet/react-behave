# composeHandlers

Compose the specified handlers into a single handler function.

## Usage

```js
import React from 'react'
import { composeHandlers } from 'react-behave'

function MyComponent({ children }) {
  function handleClick(event) {
    console.log('event:', event)
  }

  const child = React.Children.only(children)
  return React.cloneElement(child, {
    onClick: composeHandlers([handleClick, child.onClick]),
  })
}
```

## Type signature

```js
composeHandlers(handlers): (event) => void
```

**Parameters**:

- `handlers: Array`:
  The handlers to compose.
  All falsy handlers are skipped.

**Return** `Function`: A composed event handler.
