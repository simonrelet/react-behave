import { mount } from 'enzyme';
import React from 'react';
import MergeRefs from './MergeRefs';

describe('<MergeRefs />', () => {
  it('merges refs', () => {
    const refObject = React.createRef();
    const refCallback = jest.fn();
    mount(
      <MergeRefs refs={[refObject, refCallback]}>
        {ref => <p ref={ref}>Hello</p>}
      </MergeRefs>,
    );
    expect(refObject.current).toBeDefined();
    expect(refCallback).toHaveBeenCalledWith(expect.anything());
  });

  it("doesn't pass a ref if the array is empty", () => {
    const render = jest.fn(() => <p>Hello</p>);
    mount(<MergeRefs refs={[]}>{render}</MergeRefs>);
    expect(render).toHaveBeenCalledWith(null);
  });

  it("doesn't pass a ref if the array only contain falsy values", () => {
    const render = jest.fn(() => <p>Hello</p>);
    mount(<MergeRefs refs={[null, undefined]}>{render}</MergeRefs>);
    expect(render).toHaveBeenCalledWith(null);
  });
});
