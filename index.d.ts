import * as PopperJS from 'popper.js'
import * as React from 'react'

/**
 * @fileoverview This file only declares the public portions of the API.
 * It should not define internal pieces.
 */

export function callHandlers<
  EVENT extends React.SyntheticEvent<any>,
  HANDLER extends React.EventHandler<EVENT>
>(event: EVENT, handlers: Array<HANDLER | null>): void

export function composeHandlers<
  EVENT extends React.SyntheticEvent<any>,
  HANDLER extends React.EventHandler<EVENT>
>(handlers: Array<HANDLER | null>): (event: EVENT) => void

export interface RefFunction<ELEMENT> {
  (element: ELEMENT): void
}

export function setRefs<ELEMENT>(
  element: ELEMENT | null,
  handlers: Array<
    RefFunction<ELEMENT> | React.MutableRefObject<ELEMENT> | null
  >,
): void

export function composeRefs<ELEMENT>(
  handlers: Array<
    RefFunction<ELEMENT> | React.MutableRefObject<ELEMENT> | null
  >,
): React.MutableRefObject<ELEMENT>

export interface ScreenSizes {
  [key: string]: number
}

export function getScreenSize(
  screenSizes: ScreenSizes,
  width: number,
): string | null

export type UsePopperOptions = {
  disabled?: boolean
  arrowRef?: React.MutableRefObject<string | HTMLElement | null>
  placement?: PopperJS.Placement
  modifiers?: PopperJS.Modifiers
  eventsEnabled?: boolean
  positionFixed?: boolean
}

export type UsePopperReturnValue = {
  style: CSSStyleDeclaration
  arrowStyle: CSSStyleDeclaration
  placement: PopperJS.Placement | null
  outOfBoundaries: boolean
  scheduleUpdate(): void
}

export function usePopper(
  referenceRef: React.MutableRefObject<
    HTMLElement | PopperJS.ReferenceObject | null
  >,
  popperRef: React.MutableRefObject<HTMLElement | null>,
  options?: UsePopperOptions,
): UsePopperReturnValue

export function watchResize(
  target: HTMLElement,
  cb: (size: DOMRect) => void,
  options?: { resizeInterval?: number },
): () => void

export type AsyncState<VALUE_TYPE> = {
  value: VALUE_TYPE | null
  error: Error | null
  pending: boolean
}

export type UseAsyncMemoOptions<VALUE_TYPE> = {
  initialValue?: VALUE_TYPE | null
}

export function useAsyncMemo<VALUE_TYPE>(
  factory: () => Promise<VALUE_TYPE>,
  dependencies: React.DependencyList,
  options?: UseAsyncMemoOptions<VALUE_TYPE>,
): [VALUE_TYPE | null, AsyncState<VALUE_TYPE>]

export type UseAsyncCallbackOptions<VALUE_TYPE> = {
  initialValue?: VALUE_TYPE | null
}

export function useAsyncCallback<VALUE_TYPE>(
  callback: (...arguments: any[]) => Promise<VALUE_TYPE>,
  deps: React.DependencyList,
  options?: UseAsyncCallbackOptions<VALUE_TYPE>,
): [(...arguments: any[]) => Promise<VALUE_TYPE>, AsyncState<VALUE_TYPE>]
