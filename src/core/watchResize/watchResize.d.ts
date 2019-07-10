export default function watchResize(
  target: HTMLElement,
  cb: (size: DOMRect) => void,
  options?: { resizeInterval?: number },
): () => void
