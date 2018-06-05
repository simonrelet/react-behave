import React from 'react';
import DropDown from './DropDown';
import ClickOutside from '../ClickOutside';
import { mount } from 'enzyme';

describe('<DropDown />', () => {
  it('passes down the ref to `render`', () => {
    const render = jest.fn();

    mount(<DropDown render={render} renderDropDown={jest.fn()} />);
    expect(render).toHaveBeenCalledWith(expect.anything());
  });

  it('passes down the ref and props to `renderDropDown`', () => {
    const renderDropDown = jest.fn(() => <p />);

    mount(
      <DropDown
        open={true}
        render={jest.fn()}
        renderDropDown={renderDropDown}
      />,
    );

    expect(renderDropDown).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
    );
  });

  it("doesn't call `renderDropDown` when not opened", () => {
    const renderDropDown = jest.fn();

    mount(<DropDown render={jest.fn()} renderDropDown={renderDropDown} />);
    expect(renderDropDown).not.toHaveBeenCalled();
  });

  it("shouldn't add a <ClickOutside /> component if `onClickOutside` is not provided", () => {
    const renderDropDown = jest.fn(() => <p />);
    const wrapper = mount(
      <DropDown
        open={true}
        render={jest.fn()}
        renderDropDown={renderDropDown}
      />,
    );

    expect(wrapper.find(ClickOutside)).toHaveLength(0);
  });

  it('should add a <ClickOutside /> component if `onClickOutside` is provided', () => {
    const renderDropDown = jest.fn(() => <p />);
    const wrapper = mount(
      <DropDown
        onClickOutside={jest.fn()}
        open={true}
        render={jest.fn()}
        renderDropDown={renderDropDown}
      />,
    );

    expect(wrapper.find(ClickOutside).first()).toBeDefined();
  });
});
