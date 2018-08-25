import React from 'react'
import Dropdown from './Dropdown'
import ClickOutside from '../ClickOutside'
import { mount } from 'enzyme'

describe('<Dropdown />', () => {
  it('passes down the ref to `render`', () => {
    const render = jest.fn()
    mount(<Dropdown renderDropDown={jest.fn()}>{render}</Dropdown>)
    expect(render).toHaveBeenCalledWith(expect.anything())
  })

  it('passes down the ref and props to `renderDropDown`', () => {
    const renderDropDown = jest.fn(() => <p />)
    mount(
      <Dropdown open={true} renderDropDown={renderDropDown}>
        {jest.fn()}
      </Dropdown>,
    )
    expect(renderDropDown).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
    )
  })

  it("doesn't call `renderDropDown` when not opened", () => {
    const renderDropDown = jest.fn()
    mount(<Dropdown renderDropDown={renderDropDown}>{jest.fn()}</Dropdown>)
    expect(renderDropDown).not.toHaveBeenCalled()
  })

  it("shouldn't add a <ClickOutside /> component if `onClickOutside` is not provided", () => {
    const renderDropDown = jest.fn(() => <p />)
    const wrapper = mount(
      <Dropdown open={true} renderDropDown={renderDropDown}>
        {jest.fn()}
      </Dropdown>,
    )
    expect(wrapper.find(ClickOutside)).toHaveLength(0)
  })

  it('should add a <ClickOutside /> component if `onClickOutside` is provided', () => {
    const renderDropDown = jest.fn(() => <p />)
    const wrapper = mount(
      <Dropdown
        onClickOutside={jest.fn()}
        open={true}
        renderDropDown={renderDropDown}
      >
        {jest.fn()}
      </Dropdown>,
    )
    expect(wrapper.find(ClickOutside).first()).toBeDefined()
  })
})
