import * as React from 'react'

export function callHandlers<T = Element>(
  event: React.SyntheticEvent<T>,
  handlers: Array<React.ReactEventHandler<T>>,
): void
