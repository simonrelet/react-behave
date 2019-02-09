export default function watchResize(
  target: HTMLElement,
  cb: (size: { width: number; height: number }) => void,
  options?: { resizeInterval?: number },
): () => void
