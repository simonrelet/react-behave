import * as React from 'react'
import { RefFunction } from '../setRefs'

export default function composeRefs(
  handlers: Array<RefFunction | React.RefObject<HTMLElement>>,
): RefFunction
