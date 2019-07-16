import * as React from 'react'

export interface RefFunction<ELEMENT> {
  (element: ELEMENT): void
}

export function setRefs<ELEMENT>(
  element: ELEMENT | null,
  handlers: Array<RefFunction<ELEMENT> | React.RefObject<ELEMENT> | null>,
): void
