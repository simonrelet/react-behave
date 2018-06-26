import { mount } from 'enzyme';
import React from 'react';
import MergeRefs from './MergeRefs';

describe('<MergeRefs />', () => {
  it('merges refs', () => {
    const refObject = React.createRef();
    const refCallback = jest.fn();
    mount(
      <MergeRefs
        refs={[refObject, refCallback]}
        render={ref => <p ref={ref}>Hello</p>}
      />,
    );
    expect(refObject.current).toBeDefined();
    expect(refCallback).toHaveBeenCalledWith(expect.anything());
  });

  it("doesn't pass a ref if the array is empty", () => {
    const render = jest.fn(() => <p>Hello</p>);
    mount(<MergeRefs refs={[]} render={render} />);
    expect(render).toHaveBeenCalledWith(null);
  });

  it("doesn't pass a ref if the array only contain falsy values", () => {
    const render = jest.fn(() => <p>Hello</p>);
    mount(<MergeRefs refs={[null, undefined]} render={render} />);
    expect(render).toHaveBeenCalledWith(null);
  });
});
