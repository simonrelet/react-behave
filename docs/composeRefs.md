# composeRefs

Compose the specified ref handlers into a single one.
Each handler can either be a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)
or a Ref object (e.g. created by [`React.useRef`](https://reactjs.org/docs/hooks-reference.html#useref)).

## Usage

```js
import React from 'react'
import { composeRefs } from 'react-behave'

const FancyButton = React.forwardRef((props, ref) => {
  const elementRef = React.useRef(null)

  return <button ref={composeRefs([elementRef, ref])} {...props} />
})
```

## Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td><code>handlers</code></td>
      <td>
        <strong>Array&lt;React.RefObject | ((value: any) => void) | null&gt;</strong>
        <p>
          The handlers to call with the value.
          All falsy handlers are skipped.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

**React.RefObject**

A composed Ref object.
