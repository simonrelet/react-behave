import * as React from 'react'

export interface RefFunction {
  (ref: HTMLElement): void
}

export interface RenderProps {
  ref: RefFunction
}

export interface MergeRefsProps {
  children(props: RenderProps): React.ReactNode
  refs: Array<RefFunction | React.RefObject<HTMLElement>>
}

export declare const MergeRefs: React.ComponentType<MergeRefsProps>
