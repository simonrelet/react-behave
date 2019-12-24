import { act } from '@testing-library/react'
import PopperJs from 'popper.js'

let calls = []
let instances = []

export default class PopperJS {
  static placements = PopperJs.placements

  static mockReset = () => {
    instances = []
    calls = []
  }

  static mock = {
    get calls() {
      return calls.slice()
    },

    get instances() {
      return instances.slice()
    },

    get lastInstance() {
      return instances[instances.length - 1]
    },
  }

  constructor(reference, popper, options) {
    const instance = {
      destroy: jest.fn(() => {}),
      scheduleUpdate: jest.fn(() => {}),

      async mockUpdateStateModifier({
        instance = { popper: { parentElement: {} } },
        arrowStyles = {},
        hide = false,
        placement = 'bottom',
        styles = {},
      } = {}) {
        return new Promise(resolve => {
          act(() => {
            options.modifiers.updateStateModifier.fn({
              instance,
              arrowStyles,
              hide,
              placement,
              styles,
            })
          })

          resolve()
        })
      },
    }

    instances.push(instance)
    calls.push([reference, popper, options])

    return instance
  }
}
