export interface ScreenSizes {
  [key: string]: number
}

export function getScreenSize(
  screenSizes: ScreenSizes,
  width: number,
): string | null
