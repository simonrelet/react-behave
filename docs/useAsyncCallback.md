# useAsyncCallback

Returns an asynchronous memoized callback.

This hook can been seen as a [`React.useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback)
for asynchronous inline callbacks.

## Usage

### With an asynchronous computation

```js
import React from 'react'
import { useAsyncCallback } from 'react-behave'

function ComplexFormula({ parameters }) {
  const [computeFormula, formulaState] = useAsyncCallback(async () => {
    const a = await computeA(parameters)
    const b = await computeB(a)
    return await computeC(b)
  }, [parameters])

  const displayedResult =
    formulaState.value != null
      ? formulaState.value
      : formulaState.pending
      ? '...'
      : 'None'

  return (
    <section>
      <button onClick={computeFormula}>Compute formula</button>
      <p>Result: {displayedResult}</p>

      {formulaState.error != null && (
        <p>Could not compute formula: {formulaState.error.message}</p>
      )}
    </section>
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
      <td><code>callback</code></td>
      <td>
        <strong>() => Promise&lt;any&gt;</strong>
        <p>The callback function.</p>
      </td>
    </tr>
    <tr>
      <td><code>deps</code></td>
      <td>
        <strong>Array</strong>
        <p>
          The array of dependencies.
          When a dependency changes while a call is in progress the result will be ignored as if the call was canceled.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?</code></td>
      <td>
        <strong>object</strong> <em>= <code>{}</code></em>
        <p>The hook options.</p>
      </td>
    </tr>
    <tr>
      <td><code>options?.initialValue?</code></td>
      <td>
        <strong>any</strong> <em>= <code>null</code></em>
        <p>
          The value that will be returned until one is returned by the
          <code>callback</code>.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

**Array**

The first element is the memoized callback.
The second element is the current state of the callback which contains the
following properties:

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
        <strong>any | null</strong>
        <p>
          The current value.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>error</code></td>
      <td>
        <strong>Error | null</strong>
        <p>The error thrown by the callback.</p>
      </td>
    </tr>
    <tr>
      <td><code>pending</code></td>
      <td>
        <strong>boolean</strong>
        <p>Whether the callback is running.</p>
      </td>
    </tr>
  </tbody>
</table>
