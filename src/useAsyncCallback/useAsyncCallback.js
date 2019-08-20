import React from 'react'
import {
  asyncStateReducer,
  ERROR,
  initializeStateWithValue,
  START,
  SUCCESS,
} from '../asyncState'

export function useAsyncCallback(callback, deps, { initialValue = null } = {}) {
  const [state, dispatch] = React.useReducer(
    asyncStateReducer,
    initialValue,
    initializeStateWithValue,
  )

  const cancelCurrentCallback = React.useRef(null)

  React.useEffect(() => {
    return () => {
      if (cancelCurrentCallback.current != null) {
        cancelCurrentCallback.current()
      }
    }
  }, [])

  const run = React.useCallback(
    async (...args) => {
      if (cancelCurrentCallback.current != null) {
        cancelCurrentCallback.current()
      }

      let canceled = false
      cancelCurrentCallback.current = () => {
        canceled = true
      }

      dispatch({ type: START })

      try {
        const value = await callback(...args)

        if (!canceled) {
          dispatch({ type: SUCCESS, value })
        }

        return value
      } catch (error) {
        if (!canceled) {
          dispatch({ type: ERROR, error })
        }

        throw error
      }
    },
    // We don't add `callback` to deps to let the caller manage it himself.
    // This is _ok_ as the latest `callback` will only be used if `deps`
    // changes, which is the behaviour of `React.useMemo`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )

  return [run, state]
}
