import * as React from 'react'

export default function composeHandlers<T = Element>(
  handlers: Array<React.ReactEventHandler<T>>,
): (event: React.SyntheticEvent<T>) => void
