import { render } from '@testing-library/react'
import PopperJS from 'popper.js'
import React from 'react'
import { usePopper } from './usePopper'

function renderHook({ reference, popper, options }) {
  function HookedComponent({ renderHook }) {
    renderHook()
    return null
  }

  const hookResult = { current: null }

  const { rerender, ...result } = render(
    <HookedComponent
      renderHook={() => {
        hookResult.current = usePopper(reference, popper, options)
      }}
    />,
  )

  const prevReference = reference
  const prevPopper = popper
  const prevOptions = options

  return {
    ...result,
    hookResult,
    rerender: ({
      reference = prevReference,
      popper = prevPopper,
      options = prevOptions,
    }) => {
      rerender(
        <HookedComponent
          renderHook={() => {
            hookResult.current = usePopper(reference, popper, options)
          }}
        />,
      )
    },
  }
}

const STYLE = { top: 21, left: 42 }

function expectHookResult(
  hookResult,
  {
    arrowStyle = {},
    outOfBoundaries = false,
    placement = null,
    style = {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      pointerEvents: 'none',
    },
  } = {},
) {
  expect(hookResult.current).toEqual({
    arrowStyle,
    outOfBoundaries,
    placement,
    style,
    scheduleUpdate: expect.any(Function),
  })
}

describe('usePopper', () => {
  afterEach(() => {
    PopperJS.mockReset()
  })

  it('should return the initial state when the reference is null', () => {
    const { hookResult } = renderHook({
      reference: { current: null },
      popper: { current: 'popper' },
    })

    expect(PopperJS.mock.calls).toHaveLength(0)
    expectHookResult(hookResult)
  })

  it('should return the initial state when the popper is null', () => {
    const { hookResult } = renderHook({
      reference: { current: 'reference' },
      popper: { current: null },
    })

    expect(PopperJS.mock.calls).toHaveLength(0)
    expectHookResult(hookResult)
  })

  it('should return initial state when the disabled option is true', () => {
    const { hookResult } = renderHook({
      reference: { current: 'reference' },
      popper: { current: 'popper' },
      options: { disabled: true },
    })

    expect(PopperJS.mock.calls).toHaveLength(0)
    expectHookResult(hookResult)
  })

  it('should return the computed state', async () => {
    const { hookResult } = renderHook({
      reference: { current: 'reference' },
      popper: { current: 'popper' },
    })

    expect(PopperJS.mock.calls).toMatchSnapshot()

    await PopperJS.mock.lastInstance.mockUpdateStateModifier({ styles: STYLE })
    expectHookResult(hookResult, { style: STYLE, placement: 'bottom' })
  })

  it('should cleanup on unmount', async () => {
    const { hookResult, unmount } = renderHook({
      reference: { current: 'reference' },
      popper: { current: 'popper' },
    })

    await PopperJS.mock.lastInstance.mockUpdateStateModifier({ styles: STYLE })
    expectHookResult(hookResult, { style: STYLE, placement: 'bottom' })

    unmount()
    expect(PopperJS.mock.lastInstance.destroy).toHaveBeenCalled()
  })

  // should include the arrow in the computed state
  it('should include the arrow in the computed state', async () => {
    const { hookResult } = renderHook({
      reference: { current: 'reference' },
      popper: { current: 'popper' },
      options: {
        arrowRef: { current: 'arrow' },
      },
    })

    expect(PopperJS.mock.calls).toMatchSnapshot()

    await PopperJS.mock.lastInstance.mockUpdateStateModifier({
      styles: STYLE,
      arrowStyles: STYLE,
    })

    expectHookResult(hookResult, {
      style: STYLE,
      arrowStyle: STYLE,
      placement: 'bottom',
    })
  })

  it("should keep the same style references of computed state when they haven't changed", async () => {
    const { hookResult } = renderHook({
      reference: { current: 'reference' },
      popper: { current: 'popper' },
    })

    await PopperJS.mock.lastInstance.mockUpdateStateModifier({
      styles: STYLE,
      arrowStyles: STYLE,
    })

    expectHookResult(hookResult, {
      style: STYLE,
      arrowStyle: STYLE,
      placement: 'bottom',
    })

    const currentResult = hookResult.current

    await PopperJS.mock.lastInstance.mockUpdateStateModifier({
      styles: { ...STYLE },
      arrowStyles: { ...STYLE },
    })

    expect(hookResult.current.style).toBe(currentResult.style)
    expect(hookResult.current.arrowStyles).toBe(currentResult.arrowStyles)
  })

  // should ignore calls to scheduleUpdate when there are no PopperJS instances
  it('should ignore calls to scheduleUpdate when there are no PopperJS instances', () => {
    const { hookResult } = renderHook({
      reference: { current: null },
      popper: { current: null },
    })

    // Don't throw.
    hookResult.current.scheduleUpdate()
  })
})
