import * as React from 'react'
import { RefFunction } from '../setRefs'

export function composeRefs(
  handlers: Array<RefFunction | React.RefObject<HTMLElement>>,
): RefFunction
