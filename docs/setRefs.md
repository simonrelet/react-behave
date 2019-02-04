<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/core/setRefs/setRefs.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# setRefs

Set the ref for all the supplied handlers.
Each handler can either be a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) or an object created with [`React.createRef`](https://reactjs.org/docs/react-api.html#reactcreateref).

## Usage

```js
import React from 'react'
import { setRefs } from 'react-behave'

function callbackRef(ref) {
  console.log(ref)
}

const objectRef = React.createRef()

setRefs(document.getElementById('user'), [callbackRef, objectRef])
```

## Type signature

```js
setRefs(ref, handlers): void
```

**Parameters**:

- `ref: HTMLElement`: The ref to apply.
- `handlers: Array`: The handlers.

**Return** `void`