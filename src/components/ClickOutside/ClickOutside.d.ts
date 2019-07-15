import * as React from 'react'

export interface RenderProps {
  ref: React.RefObject<HTMLElement>
}

export interface ClickOutsideProps {
  children(props: RenderProps): React.ReactNode
  onClickOutside(event: React.MouseEvent): void
  onEscape?(event: React.KeyboardEvent): void
}

export declare const ClickOutside: React.ComponentType<ClickOutsideProps>
