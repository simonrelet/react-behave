import * as React from 'react'

export function callHandlers<
  EVENT extends React.SyntheticEvent<any>,
  HANDLER extends React.EventHandler<EVENT>
>(event: EVENT, handlers: Array<HANDLER | null>): void
