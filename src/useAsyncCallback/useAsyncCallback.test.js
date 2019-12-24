import { act, render, wait } from '@testing-library/react'
import React from 'react'
import { useAsyncCallback } from './useAsyncCallback'

function renderHook({ callback, dependencies, options }) {
  function HookedComponent({ renderHook }) {
    renderHook()
    return null
  }

  const hookResult = { current: null }

  const { rerender, ...result } = render(
    <HookedComponent
      renderHook={() => {
        hookResult.current = useAsyncCallback(callback, dependencies, options)
      }}
    />,
  )

  const prevCallback = callback
  const prevDependencies = dependencies
  const prevOptions = options

  return {
    ...result,
    hookResult,
    rerender: ({
      callback = prevCallback,
      dependencies = prevDependencies,
      options = prevOptions,
    }) => {
      rerender(
        <HookedComponent
          renderHook={() => {
            hookResult.current = useAsyncCallback(
              callback,
              dependencies,
              options,
            )
          }}
        />,
      )
    },
  }
}

const VALUE = 'value'
const OTHER_VALUE = 'other-value'
const ERROR = new Error('oups')

function expectHookResult(
  hookResult,
  {
    callback = expect.any(Function),
    value = null,
    pending = false,
    error = null,
  },
) {
  expect(hookResult.current).toEqual([callback, { value, pending, error }])
}

describe('useAsyncCallback', () => {
  it('should preserve the reference when the dependencies are the same', () => {
    const { hookResult, rerender } = renderHook({
      callback: () => {},
      dependencies: [],
    })

    const callback = hookResult.current[0]
    rerender({ callback: () => {} })
    expect(hookResult.current[0]).toBe(callback)
  })

  it('should update the reference when a dependency changes', () => {
    const { hookResult, rerender } = renderHook({
      callback: () => {},
      dependencies: [1],
    })

    const callback = hookResult.current[0]
    rerender({ callback: () => {}, dependencies: [2] })
    expect(hookResult.current[0]).not.toBe(callback)
  })

  it('should pass the parameters to the callback', async () => {
    const callback = jest.fn(() => new Promise(() => {}))
    const { hookResult } = renderHook({ callback, dependencies: [] })
    const parameters = [1, 'a', { f: () => {} }]

    act(() => {
      hookResult.current[0](...parameters)
    })

    expect(callback).toHaveBeenCalledWith(...parameters)
  })

  it('should store the result value of the callback', async () => {
    const { hookResult } = renderHook({
      callback: () => Promise.resolve(VALUE),
      dependencies: [],
    })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE })
  })

  it('should store the result error of the callback', async () => {
    const { hookResult } = renderHook({
      callback: () => Promise.reject(ERROR),
      dependencies: [],
    })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    await wait()
    expectHookResult(hookResult, { error: ERROR })
  })

  it('should keep the current value before getting a new one from the same callback', async () => {
    const { hookResult } = renderHook({
      callback: value => Promise.resolve(value),
      dependencies: [],
    })

    act(() => {
      hookResult.current[0](VALUE)
    })

    await wait()
    expectHookResult(hookResult, { value: VALUE })

    act(() => {
      hookResult.current[0](OTHER_VALUE)
    })

    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: OTHER_VALUE })
  })

  it('should keep the current value before getting a new one from another callback', async () => {
    const { hookResult, rerender } = renderHook({
      callback: () => Promise.resolve(VALUE),
      dependencies: [1],
    })

    act(() => {
      hookResult.current[0]()
    })

    await wait()
    expectHookResult(hookResult, { value: VALUE })

    rerender({
      callback: () => Promise.resolve(OTHER_VALUE),
      dependencies: [2],
    })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: OTHER_VALUE })
  })

  it('should keep the previous value after getting an error from the same callback', async () => {
    const { hookResult } = renderHook({
      callback: factory => factory(),
      dependencies: [],
    })

    act(() => {
      hookResult.current[0](() => Promise.resolve(VALUE))
    })

    await wait()
    expectHookResult(hookResult, { value: VALUE })

    act(() => {
      hookResult.current[0](() => Promise.reject(ERROR))
    })

    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE, error: ERROR })
  })

  it('should keep the previous value after getting an error from another callback', async () => {
    const { hookResult, rerender } = renderHook({
      callback: () => Promise.resolve(VALUE),
      dependencies: [1],
    })

    act(() => {
      hookResult.current[0]()
    })

    await wait()
    expectHookResult(hookResult, { value: VALUE })

    rerender({ callback: () => Promise.reject(ERROR), dependencies: [2] })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE, error: ERROR })
  })

  it('should forget the previous error after getting a value from the same callback ', async () => {
    const { hookResult } = renderHook({
      callback: factory => factory(),
      dependencies: [],
    })

    act(() => {
      hookResult.current[0](() => Promise.reject(ERROR))
    })

    await wait()
    expectHookResult(hookResult, { error: ERROR })

    act(() => {
      hookResult.current[0](() => Promise.resolve(VALUE))
    })

    expectHookResult(hookResult, { error: ERROR, pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE })
  })

  it('should forget the previous error after getting a value from another callback ', async () => {
    const { hookResult, rerender } = renderHook({
      callback: () => Promise.reject(ERROR),
      dependencies: [1],
    })

    act(() => {
      hookResult.current[0]()
    })

    await wait()
    expectHookResult(hookResult, { error: ERROR })

    rerender({ callback: () => Promise.resolve(VALUE), dependencies: [2] })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { error: ERROR, pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE })
  })

  it('should ignore the value of the previous call when a new call is made from the same callback', async () => {
    const resolveCallbacks = []

    const callback = () =>
      new Promise(resolve => {
        resolveCallbacks.push(resolve)
      })

    const { hookResult } = renderHook({ callback, dependencies: [] })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    act(() => {
      resolveCallbacks[0](VALUE)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the value of the previous call when a new call is made from another callback', async () => {
    let resolveFirstCallback

    const firstCallback = () =>
      new Promise(resolve => {
        resolveFirstCallback = resolve
      })

    const { hookResult, rerender } = renderHook({
      callback: firstCallback,
      dependencies: [1],
    })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    rerender({
      callback: () => new Promise(() => {}),
      dependencies: [2],
    })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    act(() => {
      resolveFirstCallback(VALUE)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the value of the current call when the hook is unmounted', async () => {
    let resolveCallback

    const callback = () =>
      new Promise(resolve => {
        resolveCallback = resolve
      })

    const { hookResult, unmount } = renderHook({ callback, dependencies: [] })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    unmount()
    expectHookResult(hookResult, { pending: true })

    act(() => {
      resolveCallback(VALUE)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the error of the previous call when a new call is made from the same callback', async () => {
    const rejectCallbacks = []

    const callback = () =>
      new Promise((_, reject) => {
        rejectCallbacks.push(reject)
      })

    const { hookResult } = renderHook({ callback, dependencies: [] })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    act(() => {
      rejectCallbacks[0](ERROR)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the error of the previous call when a new call is made from another callback', async () => {
    let rejectFirstCallback

    const firstCallback = () =>
      new Promise((_, reject) => {
        rejectFirstCallback = reject
      })

    const { hookResult, rerender } = renderHook({
      callback: firstCallback,
      dependencies: [1],
    })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    rerender({ callback: () => new Promise(() => {}), dependencies: [2] })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    act(() => {
      rejectFirstCallback(ERROR)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the error of the current call when the hook is unmounted', async () => {
    let rejectCallback

    const callback = () =>
      new Promise((_, reject) => {
        rejectCallback = reject
      })

    const { hookResult, unmount } = renderHook({ callback, dependencies: [] })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { pending: true })

    unmount()
    expectHookResult(hookResult, { pending: true })

    act(() => {
      rejectCallback(ERROR)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should use the initial value until one is returned', async () => {
    const { hookResult } = renderHook({
      callback: () => Promise.resolve(OTHER_VALUE),
      dependencies: [],
      options: { initialValue: VALUE },
    })

    expectHookResult(hookResult, { value: VALUE })

    act(() => {
      hookResult.current[0]()
    })

    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: OTHER_VALUE })
  })
})
