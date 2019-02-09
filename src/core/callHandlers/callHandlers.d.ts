import * as React from 'react'

export default function callHandlers<T = Element>(
  event: React.SyntheticEvent<T>,
  handlers: Array<React.ReactEventHandler<T>>,
): void
