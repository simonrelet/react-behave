# callHandlers

Call each handler with the specified event.

## Usage

```js
import React from 'react'
import { callHandlers } from 'react-behave'

function MyComponent({ children }) {
  function handleClick(event) {
    console.log('event:', event)
  }

  const child = React.Children.only(children)
  return React.cloneElement(child, {
    onClick: e => callHandlers(e, [handleClick, child.onClick]),
  })
}
```

## Type signature

```js
callHandlers(event, handlers): void
```

**Parameters**:

- `event: Event`: The event.
- `handlers: Array`:
  The handlers to call with the event.
  All falsy handlers are skipped.
