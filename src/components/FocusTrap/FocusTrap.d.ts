import * as React from 'react'

export interface RenderProps {
  ref: React.RefObject<HTMLElement>
  fallbackRef: React.RefObject<HTMLElement>
}

export interface FocusTrapProps {
  active?: boolean
  children(props: RenderProps): React.ReactNode
  returnFocusOnDeactivate?: boolean
}

export declare const FocusTrap: React.ComponentType<FocusTrapProps>
