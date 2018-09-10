import minWidthModifier from './minWidthModifier'

describe('minWidthModifier', () => {
  it('adds a `minWidth` if the drop down is smaller or equal than the reference', () => {
    const res = minWidthModifier.fn({
      offsets: {
        reference: { width: 100 },
        popper: { width: 100 },
      },
      placement: 'top',
      styles: {},
    })
    expect(res.styles.minWidth).toBe('100px')
  })

  it("doesn't add a `minWidth` if the drop down is bigger than the reference", () => {
    const res = minWidthModifier.fn({
      offsets: {
        reference: { width: 100 },
        popper: { width: 101 },
      },
      placement: 'bottom-start',
      styles: {},
    })
    expect(res.styles.minWidth).toBeUndefined()
  })

  it("doesn't add a `minWidth` if the drop down is on the left or right side of the reference", () => {
    const res = minWidthModifier.fn({
      offsets: {
        reference: { width: 100 },
        popper: { width: 99 },
      },
      placement: 'left',
      styles: {},
    })
    expect(res.styles.minWidth).toBeUndefined()
  })
})
