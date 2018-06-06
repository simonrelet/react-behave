import { mount } from 'enzyme';
import React from 'react';
import renderMethod from './renderMethod';

describe('renderMethod', () => {
  it('renders the `children` in priority', () => {
    const methods = {
      children: <p>children</p>,
      component: jest.fn(() => <p>component</p>),
      render: jest.fn(() => <p>render</p>),
    };

    const wrapper = mount(renderMethod(methods));

    expect(wrapper.text()).toBe('children');
    expect(methods.component).not.toHaveBeenCalled();
    expect(methods.render).not.toHaveBeenCalled();
  });

  it('renders the `component` if there is no `children`', () => {
    const methods = {
      component: jest.fn(() => <p>component</p>),
      render: jest.fn(() => <p>render</p>),
    };

    const wrapper = mount(renderMethod(methods));

    expect(wrapper.text()).toBe('component');
    expect(methods.render).not.toHaveBeenCalled();
  });

  it('calls `render` if there is no `children` nor `component`', () => {
    const methods = {
      render: jest.fn(() => <p>render</p>),
    };

    const wrapper = mount(renderMethod(methods));

    expect(wrapper.text()).toBe('render');
  });

  it('throws if no methods were given', () => {
    expect(() => mount(renderMethod({}))).toThrow();
  });

  it('passes the props to the `component`', () => {
    const methods = {
      component: jest.fn(() => <p>component</p>),
    };

    const props = {
      prop1: true,
      prop2: true,
    };

    mount(renderMethod(methods, props));

    // The `expect.anything()` is to ignore the second parameter of the call.
    expect(methods.component).toHaveBeenCalledWith(props, expect.anything());
  });

  it('passes the props to the `render`', () => {
    const methods = {
      render: jest.fn(() => <p>render</p>),
    };

    const props = {
      prop1: true,
      prop2: true,
    };

    mount(renderMethod(methods, props));

    expect(methods.render).toHaveBeenCalledWith(props);
  });
});
