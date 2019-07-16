import * as React from 'react'
import { RefFunction } from '../setRefs'

export function composeRefs<ELEMENT>(
  handlers: Array<RefFunction<ELEMENT> | React.RefObject<ELEMENT> | null>,
): RefFunction<ELEMENT>
