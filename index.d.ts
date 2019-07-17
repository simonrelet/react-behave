import { BaseModifier, Modifiers, Placement, ReferenceObject } from 'popper.js'
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
  handlers: Array<RefFunction<ELEMENT> | React.RefObject<ELEMENT> | null>,
): void

export function composeRefs<ELEMENT>(
  handlers: Array<RefFunction<ELEMENT> | React.RefObject<ELEMENT> | null>,
): RefFunction<ELEMENT>

export interface ScreenSizes {
  [key: string]: number
}

export function getScreenSize(
  screenSizes: ScreenSizes,
  width: number,
): string | null

export declare const minWidthModifier: BaseModifier

export type UsePopperOptions = {
  arrow?: string | HTMLElement | null
  placement?: Placement
  modifiers?: Modifiers
  eventsEnabled?: boolean
  positionFixed?: boolean
}

export type UsePopperReturnValue = {
  style: CSSStyleDeclaration
  arrowStyle: CSSStyleDeclaration
  placement: Placement | null
  outOfBoundaries: boolean
  scheduleUpdate(): void
}

export function usePopper(
  reference: HTMLElement | ReferenceObject | null,
  popper: HTMLElement | null,
  options?: UsePopperOptions,
): UsePopperReturnValue

export function watchResize(
  target: HTMLElement,
  cb: (size: DOMRect) => void,
  options?: { resizeInterval?: number },
): () => void
