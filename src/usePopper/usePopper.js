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

function getCurrentValue(value, newValue) {
  return isEqual(value, newValue) ? value : newValue
}

function updateState(newState) {
  return state => {
    return {
      // Preserve the references if the objects are deeply equal.
      style: getCurrentValue(state.style, newState.styles),
      arrowStyle: getCurrentValue(state.arrowStyle, newState.arrowStyles),

      outOfBoundaries: newState.hide,
      placement: newState.placement,
    }
  }
}

const DEFAULT_MODIFIERS = {}

usePopper.PLACEMENTS = PopperJS.placements

export function usePopper(
  referenceRef,
  popperRef,
  {
    disabled = false,
    arrowRef,
    placement = 'bottom',
    modifiers = DEFAULT_MODIFIERS,
    eventsEnabled = true,
    positionFixed = false,
  } = {},
) {
  const popperJSRef = React.useRef(null)
  const [state, setState] = React.useState(INITIAL_STATE)

  React.useEffect(
    () => {
      if (
        !disabled &&
        referenceRef.current != null &&
        popperRef.current != null
      ) {
        popperJSRef.current = new PopperJS(
          referenceRef.current,
          popperRef.current,
          {
            placement,
            eventsEnabled,
            positionFixed,
            modifiers: {
              ...modifiers,
              arrow: {
                enabled: arrowRef != null && arrowRef.current != null,
                element: arrowRef == null ? null : arrowRef.current,
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
          },
        )

        return () => {
          setState(INITIAL_STATE)
          popperJSRef.current.destroy()
          popperJSRef.current = null
        }
      }
    },

    // 'arrowRef', 'popperRef', and 'referenceRef' are React Ref objects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, placement, modifiers, eventsEnabled, positionFixed],
  )

  const scheduleUpdate = React.useCallback(() => {
    if (popperJSRef.current != null) {
      popperJSRef.current.scheduleUpdate()
    }
  }, [])

  return { ...state, scheduleUpdate }
}
