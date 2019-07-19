import { storiesOf } from '@storybook/react'
import React from 'react'
import { useAsyncCallback } from './useAsyncCallback'

const stories = storiesOf('useAsyncCallback', module)

async function asyncSquare(value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value ** 2), 3000)
  })
}

stories.add('Complex computation', () => <ComplexComputation />)

function ComplexComputation() {
  const [number, setNumber] = React.useState(10)
  const numberSaved = React.useRef(null)

  const [computeSquare, state] = useAsyncCallback(async () => {
    numberSaved.current = number
    return asyncSquare(number)
  }, [number])

  function onChange(event) {
    const number = +event.target.value

    if (!isNaN(number)) {
      setNumber(number)
    }
  }

  return (
    <div>
      <label>
        Number <input type="number" value={`${number}`} onChange={onChange} />
      </label>

      <button onClick={computeSquare}>Compute square</button>

      <p>
        The square of{' '}
        {numberSaved.current == null ? number : numberSaved.current} is{' '}
        {state.pending || state.value == null ? '...' : state.value}
      </p>

      <h5>State:</h5>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </div>
  )
}
