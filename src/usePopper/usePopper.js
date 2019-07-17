import isEqual from 'lodash.isequal'
import PopperJS from 'popper.js'
import React from 'react'

const INITIAL_STATE = {
  arrowStyle: {},
  outOfBoundaries: false,
  placement: null,
  style: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
}

function updateState(newState) {
  return state => {
    // `state` and `newState` might have different references and still be deeply
    // equal due to Popper.js.
    const arrowStyle = getCurrentValue(state.arrowStyle, newState.arrowStyles)
    const outOfBoundaries = newState.hide
    const placement = newState.placement
    const style = getCurrentValue(state.style, newState.styles)

    return arrowStyle === state.arrowStyle &&
      outOfBoundaries === state.outOfBoundaries &&
      placement === state.placement &&
      style === state.style
      ? state
      : { arrowStyle, outOfBoundaries, placement, style }
  }
}

function getCurrentValue(value, newValue) {
  return isEqual(value, newValue) ? value : newValue
}

const DEFAULT_MODIFIERS = {}

usePopper.placements = PopperJS.placements

export function usePopper(
  reference,
  popper,
  {
    arrow,
    placement = 'bottom',
    modifiers = DEFAULT_MODIFIERS,
    eventsEnabled = true,
    positionFixed = false,
  } = {},
) {
  const popperJS = React.useRef(null)
  const [state, setState] = React.useState(INITIAL_STATE)

  React.useEffect(() => {
    if (reference != null && popper != null) {
      popperJS.current = new PopperJS(reference, popper, {
        placement,
        eventsEnabled,
        positionFixed,
        modifiers: {
          ...modifiers,
          arrow: {
            enabled: arrow != null,
            element: arrow,
            ...modifiers.arrow,
          },
          applyStyle: {
            // We apply the styles ourselves.
            enabled: false,
          },
          updateStateModifier: {
            enabled: true,
            // The same as `applyStyle`.
            // https://popper.js.org/popper-documentation.html#modifiers..applyStyle.order
            order: 900,
            fn: data => {
              // The popper element might have lost his parent during the
              // computation of the position.
              // It can be due to a fast removal of the popper.
              // In case it happenned we don't dispatch the computed state.
              if (data.instance.popper.parentElement != null) {
                setState(updateState(data))
              }

              return data
            },
          },
        },
      })

      return () => {
        setState(INITIAL_STATE)
        popperJS.current.destroy()
        popperJS.current = null
      }
    }
  }, [
    reference,
    popper,
    arrow,
    placement,
    modifiers,
    eventsEnabled,
    positionFixed,
  ])

  const scheduleUpdate = React.useCallback(() => {
    if (popperJS.current != null) {
      popperJS.current.scheduleUpdate()
    }
  }, [])

  React.useLayoutEffect(() => {
    // Schedule an update if the placement has changed.
    // The styles (i.e. margins) of the popper might depend on the placement
    // which can affect its position.
    scheduleUpdate()
  }, [scheduleUpdate, state.placement])

  return { ...state, scheduleUpdate }
}
