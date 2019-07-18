# useAsyncMemo

Returns an asynchronous memoized value.

This hook can been seen as a [`React.useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo) for asynchronous factories.

## Usage

### With an asynchronous computation

```js
import React from 'react'
import { useAsyncMemo } from 'react-behave'

function ComplexFormula({ parameters }) {
  const [formulaResult, formulaState] = useAsyncMemo(async () => {
    const a = await computeA(parameters)
    const b = await computeB(a)
    return await computeC(b)
  }, [parameters])

  const displayedResult =
    formulaResult != null
      ? formulaResult
      : formulaState.pending
      ? '...'
      : 'None'

  return (
    <section>
      <p>Result: {displayedResult}</p>
      {formulaState.error != null && (
        <p>Could not compute formula: {formulaState.error.message}</p>
      )}
    </section>
  )
}
```

### With fetch

```js
import React from 'react'
import { useAsyncMemo } from 'react-behave'

function Book({ bookID }) {
  const [book, bookRequest] = useAsyncMemo(async () => {
    // We can handle the errors manually.
    try {
      return await fetchBook(bookID)
    } catch (error) {
      console.error('Could not fetch book:', error)
      return null
    }
  }, [bookID])

  // Until rendering can be Suspended in Concurrent React.
  if (bookRequest.pending) {
    return <p>Pending...</p>
  }

  // On the first rendering the asynchronous task has not started yet.
  if (book == null) {
    return null
  }

  return <h1>{book.title}</h1>
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
      <td><code>factory</code></td>
      <td>
        <strong>() => Promise&lt;any&gt;</strong>
        <p>The factory function that produces a value.</p>
      </td>
    </tr>
    <tr>
      <td><code>deps</code></td>
      <td>
        <strong>Array</strong>
        <p>The array of dependencies.</p>
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
          The value that will be returned until one is produced by the
          <code>factory</code>.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

**Array**

The first element is the memoized value.
The second element is the current state of the factory which contains the
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
          The current value (same as the first element of the returned array).
        </p>
      </td>
    </tr>
    <tr>
      <td><code>error</code></td>
      <td>
        <strong>Error | null</strong>
        <p>The error thrown by the factory.</p>
      </td>
    </tr>
    <tr>
      <td><code>pending</code></td>
      <td>
        <strong>boolean</strong>
        <p>Whether the factory is producing a new value.</p>
      </td>
    </tr>
  </tbody>
</table>
