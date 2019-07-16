# composeHandlers

Compose the specified handlers into a single handler function.

## Usage

```js
import React from 'react'
import { composeHandlers } from 'react-behave'

function FancyButton({ onFocus, ...rest }) {
  function handleFocus(event) {
    console.log('event:', event)
  }

  return <button onFocus={composeHandlers([handleFocus, onFocus])} {...rest} />
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
      <td><code>handlers</code></td>
      <td>
        <strong>Array&lt;((event: any) => void) | null&gt;</strong>
        <p>
          The handlers to compose.
          All falsy handlers are skipped.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

**(event: any) => void**

A composed event handler.
