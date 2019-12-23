import { act, render, wait } from '@testing-library/react'
import React from 'react'
import { useAsyncMemo } from './useAsyncMemo'

function renderHook({ factory, dependencies, options }) {
  function HookedComponent({ renderHook }) {
    renderHook()
    return null
  }

  const hookResult = { current: null }

  const { rerender, ...result } = render(
    <HookedComponent
      renderHook={() => {
        hookResult.current = useAsyncMemo(factory, dependencies, options)
      }}
    />,
  )

  const prevFactory = factory
  const prevDependencies = dependencies
  const prevOptions = options

  return {
    ...result,
    hookResult,
    rerender: ({
      factory = prevFactory,
      dependencies = prevDependencies,
      options = prevOptions,
    }) => {
      rerender(
        <HookedComponent
          renderHook={() => {
            hookResult.current = useAsyncMemo(factory, dependencies, options)
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
  { value = null, pending = false, error = null },
) {
  expect(hookResult.current).toEqual([value, { value, pending, error }])
}

describe('useAsyncMemo', () => {
  it('should call the factory and store the value', async () => {
    const { hookResult } = renderHook({
      factory: () => Promise.resolve(VALUE),
      dependencies: [],
    })

    expectHookResult(hookResult, { pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE })
  })

  it('should call the factory and store the error', async () => {
    const { hookResult } = renderHook({
      factory: () => Promise.reject(ERROR),
      dependencies: [],
    })

    expectHookResult(hookResult, { pending: true })

    await wait()
    expectHookResult(hookResult, { error: ERROR })
  })

  it('should keep the current value before getting a new one', async () => {
    const { hookResult, rerender } = renderHook({
      factory: () => Promise.resolve(VALUE),
      dependencies: [1],
    })

    await wait()
    expectHookResult(hookResult, { value: VALUE })

    rerender({ factory: () => Promise.resolve(OTHER_VALUE), dependencies: [2] })
    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: OTHER_VALUE })
  })

  it('should keep the previous value after getting an error', async () => {
    const { hookResult, rerender } = renderHook({
      factory: () => Promise.resolve(VALUE),
      dependencies: [1],
    })

    await wait()
    expectHookResult(hookResult, { value: VALUE })

    rerender({ factory: () => Promise.reject(ERROR), dependencies: [2] })
    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE, error: ERROR })
  })

  it('should forget the previous error after getting a value', async () => {
    const { hookResult, rerender } = renderHook({
      factory: () => Promise.reject(ERROR),
      dependencies: [1],
    })

    await wait()
    expectHookResult(hookResult, { error: ERROR })

    rerender({ factory: () => Promise.resolve(VALUE), dependencies: [2] })
    expectHookResult(hookResult, { error: ERROR, pending: true })

    await wait()
    expectHookResult(hookResult, { value: VALUE })
  })

  it('should ignore the value of the previous call when a new call is made', async () => {
    let resolveFirstFactory

    const firstFactory = () =>
      new Promise(resolve => {
        resolveFirstFactory = resolve
      })

    const { hookResult, rerender } = renderHook({
      factory: firstFactory,
      dependencies: [1],
    })

    expectHookResult(hookResult, { pending: true })

    rerender({ factory: () => new Promise(() => {}), dependencies: [2] })
    expectHookResult(hookResult, { pending: true })

    act(() => {
      resolveFirstFactory(VALUE)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the value of the current call when the hook is unmounted', async () => {
    let resolveFactory

    const factory = () =>
      new Promise(resolve => {
        resolveFactory = resolve
      })

    const { hookResult, unmount } = renderHook({ factory, dependencies: [] })
    expectHookResult(hookResult, { pending: true })

    unmount()
    expectHookResult(hookResult, { pending: true })

    act(() => {
      resolveFactory(VALUE)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the error of the previous call when a new call is made', async () => {
    let rejectFirstFactory

    const firstFactory = () =>
      new Promise((_, reject) => {
        rejectFirstFactory = reject
      })

    const { hookResult, rerender } = renderHook({
      factory: firstFactory,
      dependencies: [1],
    })

    expectHookResult(hookResult, { pending: true })

    rerender({ factory: () => new Promise(() => {}), dependencies: [2] })
    expectHookResult(hookResult, { pending: true })

    act(() => {
      rejectFirstFactory(ERROR)
    })

    await wait()
    expectHookResult(hookResult, { pending: true })
  })

  it('should ignore the error of the current call when the hook is unmounted', async () => {
    let rejectFactory

    const factory = () =>
      new Promise((_, reject) => {
        rejectFactory = reject
      })

    const { hookResult, unmount } = renderHook({ factory, dependencies: [] })
    expectHookResult(hookResult, { pending: true })

    unmount()
    expectHookResult(hookResult, { pending: true })

    act(() => {
      rejectFactory(ERROR)
    })

    await wait()

    expectHookResult(hookResult, { pending: true })
  })

  it('should use the initial value until one is returned', async () => {
    const { hookResult } = renderHook({
      factory: () => Promise.resolve(OTHER_VALUE),
      dependencies: [],
      options: { initialValue: VALUE },
    })

    expectHookResult(hookResult, { value: VALUE, pending: true })

    await wait()
    expectHookResult(hookResult, { value: OTHER_VALUE })
  })
})
