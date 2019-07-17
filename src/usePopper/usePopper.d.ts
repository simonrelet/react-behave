import { Modifiers, Placement, ReferenceObject } from 'popper.js'

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
