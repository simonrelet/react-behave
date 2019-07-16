# callHandlers

Call each handler with the specified event.

## Usage

```js
import React from 'react'
import { callHandlers } from 'react-behave'

function FancyButton({ onFocus, ...rest }) {
  function handleFocus(event) {
    console.log('event:', event)
  }

  return (
    <button
      onFocus={event => callHandlers(event, [handleFocus, onFocus])}
      {...rest}
    />
  )
}
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
      <td><code>event</code></td>
      <td>
        <strong>any</strong>
        <p>The event.</p>
      </td>
    </tr>
    <tr>
      <td><code>handlers</code></td>
      <td>
        <strong>Array&lt;((event: any) => void) | null&gt;</strong>
        <p>
          The handlers to call with the event.
          All falsy handlers are skipped.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

None.
