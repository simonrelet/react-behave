export interface RefFunction {
  (element: HTMLElement): void
}

export function setRefs(
  element: HTMLElement,
  handlers: Array<RefFunction | React.RefObject<HTMLElement>>,
): void
