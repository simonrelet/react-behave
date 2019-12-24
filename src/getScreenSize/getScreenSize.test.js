import { getScreenSize } from './getScreenSize'

const SCREEN_SIZES = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

describe('getScreenSize', () => {
  it('should return the matching screen size', () => {
    expect(getScreenSize(SCREEN_SIZES, 800)).toEqual('sm')
  })

  it('should return the matching screen size when the width is the lower bound', () => {
    expect(getScreenSize(SCREEN_SIZES, SCREEN_SIZES.md)).toEqual('md')
  })

  it('should return the matching screen size when the width is the upper bound', () => {
    expect(getScreenSize(SCREEN_SIZES, SCREEN_SIZES.lg - 1)).toEqual('md')
  })

  it('should support shuffled screen sizes', () => {
    expect(
      getScreenSize({ sm: 600, xl: 1920, lg: 1280, md: 960, xs: 0 }, 800),
    ).toEqual('sm')
  })

  it('should return null if the screen size is not found', () => {
    expect(getScreenSize({ md: 960, lg: 1280, xl: 1920 }, 800)).toBeNull()
  })
})
