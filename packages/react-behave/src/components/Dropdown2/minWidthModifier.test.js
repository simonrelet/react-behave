import minWidthModifier from './minWidthModifier';

describe('minWidthModifier', () => {
  it('adds a `minWidth` if the drop down is smaller or equal than the reference', () => {
    const res = minWidthModifier.fn({
      offsets: {
        reference: { width: 100 },
        popper: { width: 100 },
      },
      styles: {},
    });
    expect(res.styles.minWidth).toBe('100px');
  });

  it("doesn't add a `minWidth` if the drop down is bigger than the reference", () => {
    const res = minWidthModifier.fn({
      offsets: {
        reference: { width: 100 },
        popper: { width: 101 },
      },
      styles: {},
    });
    expect(res.styles.minWidth).toBeUndefined();
  });
});
