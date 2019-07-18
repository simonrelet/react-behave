const INITIAL_STATE = {
  value: null,
  error: null,
  pending: false,
}

export const START = 'START'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'

export function initializeStateWithValue(value) {
  return { ...INITIAL_STATE, value }
}

export function asyncStateReducer(state, action) {
  switch (action.type) {
    case START: {
      return { ...state, pending: true }
    }

    case SUCCESS: {
      return { value: action.value, error: null, pending: false }
    }

    case ERROR: {
      // We don't want to loose a previous value in case of later error.
      return { ...state, error: action.error, pending: false }
    }

    default: {
      throw new Error(`Unknown action type ${action.type}`)
    }
  }
}
