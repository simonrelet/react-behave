export interface RefFunction {
  (ref: HTMLElement): void
}

export default function setRefs(
  ref: HTMLElement,
  handlers: Array<RefFunction | React.RefObject<HTMLElement>>,
): void
