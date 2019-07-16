# watchResize

Watch for resizes on a target element.

## Usage

```jsx
import React from 'react'
import { watchResize } from 'react-behave'

function App() {
  const element = React.useRef(null)
  const [size, setSize] = React.useState(null)

  React.useEffect(() => {
    return watchResize(element.current, setSize)
  }, [])

  return <div ref={element}>{JSON.stringify(size)}</div>
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
      <td><code>target</code></td>
      <td>
        <strong>HTMLElement</strong>
        <p>The target to watch.</p>
      </td>
    </tr>
    <tr>
      <td><code>cb</code></td>
      <td>
        <strong>(size: DOMRect) => void</strong>
        <p>
          Invoked each time the target is resized.
          See the <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMRect"><code>DOMRect</code></a> API.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?</code></td>
      <td>
        <strong>object</strong> <em>= <code>{}</code></em>
        <p>Watch options.</p>
      </td>
    </tr>
    <tr>
      <td><code>options?.resizeInterval?</code></td>
      <td>
        <strong>number</strong> <em>= <code>166</code></em>
        <p>
          The minimum interval of time between two resizes.
          <code>166</code> corresponds to 10 frames at 60 Hz.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

**() => void**

A callback to stop watching.
