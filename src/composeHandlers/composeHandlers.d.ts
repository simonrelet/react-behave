import * as React from 'react'

export function composeHandlers<
  EVENT extends React.SyntheticEvent<any>,
  HANDLER extends React.EventHandler<EVENT>
>(handlers: Array<HANDLER | null>): (event: EVENT) => void
