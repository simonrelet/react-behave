import React from 'react'
import {
  asyncStateReducer,
  ERROR,
  initializeStateWithValue,
  START,
  SUCCESS,
} from '../asyncState'

export function useAsyncMemo(factory, deps, { initialValue = null } = {}) {
  const [state, dispatch] = React.useReducer(
    asyncStateReducer,
    initialValue,
    initializeStateWithValue,
  )

  React.useEffect(
    () => {
      let canceled = false

      async function requestValue() {
        dispatch({ type: START })

        try {
          const value = await factory()

          if (!canceled) {
            dispatch({ type: SUCCESS, value })
          }
        } catch (error) {
          if (!canceled) {
            dispatch({ type: ERROR, error })
          }
        }
      }

      requestValue()

      return () => {
        canceled = true
      }
    },
    // We don't add `callback` to deps to let the caller manage it himself.
    // This is _ok_ as the latest `callback` will only be used if `deps`
    // changes, which is the behaviour of `React.useMemo`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )

  return [state.value, state]
}
