import { storiesOf } from '@storybook/react'
import React from 'react'
import { useAsyncMemo } from './useAsyncMemo'

const stories = storiesOf('useAsyncMemo', module)

async function square(value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value ** 2), 3000)
  })
}

stories.add('Complex computation', () => <ComplexComputation />)

function ComplexComputation() {
  const [value, setvalue] = React.useState(10)

  const [result, state] = useAsyncMemo(async () => square(value), [value], {
    initialValue: 0,
  })

  function onChange(event) {
    const number = +event.target.value

    if (!isNaN(number)) {
      setvalue(number)
    }
  }

  return (
    <div>
      <label>
        The square of{' '}
        <input type="number" value={`${value}`} onChange={onChange} /> is{' '}
        {state.pending ? '...' : result}
      </label>

      <h5>State:</h5>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </div>
  )
}

const API_URL = 'https://swapi.co/api/people'

async function searchCharacters(searchValue) {
  const response = await fetch(
    `${API_URL}?search=${encodeURIComponent(searchValue)}`,
  )

  const searchResult = await response.json()
  return searchResult.results
}

stories.add('Using fetch', () => <UsingFetch />)

function UsingFetch() {
  const [searchValue, setSearchValue] = React.useState('Obi-Wan Kenobi')

  const [characters, charactersRequest] = useAsyncMemo(
    async () => {
      if (searchValue !== '') {
        return await searchCharacters(searchValue)
      }

      return []
    },
    [searchValue],
    { initialValue: [] },
  )

  return (
    <div>
      <label>
        Search a Star Wars character:{' '}
        <input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </label>

      <h5>Characters:</h5>
      {charactersRequest.pending && <p>Searching...</p>}

      <ul>
        {characters.map(character => (
          <li key={character.url}>{character.name}</li>
        ))}
      </ul>
    </div>
  )
}
