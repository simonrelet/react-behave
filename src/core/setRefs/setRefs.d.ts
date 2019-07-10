export interface RefFunction {
  (element: HTMLElement): void
}

export default function setRefs(
  element: HTMLElement,
  handlers: Array<RefFunction | React.RefObject<HTMLElement>>,
): void
