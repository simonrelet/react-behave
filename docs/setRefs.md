# setRefs

Set a value for all the supplied ref handlers.
Each handler can either be a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) or an object created with [`React.createRef`](https://reactjs.org/docs/react-api.html#reactcreateref).

## Usage

```js
import React from 'react'
import { setRefs } from 'react-behave'

const FancyButton = React.forwardRef((props, ref) => {
  const elementRef = React.useRef(null)
  const [elementState, setElementState] = React.useState(null)

  return (
    <button
      ref={element => setRefs(element, [elementRef, setElementState, ref])}
      {...props}
    />
  )
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
      <td><code>value</code></td>
      <td>
        <strong>any</strong>
        <p>The value to apply.</p>
      </td>
    </tr>
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

None.
