import React from 'react'
import Dropdown from './Dropdown'
import ClickOutside from '../ClickOutside'
import { mount } from 'enzyme'

describe('<Dropdown />', () => {
  it('passes down the refs', () => {
    const render = jest.fn(() => null)
    const renderDropdown = jest.fn(() => null)
    mount(<Dropdown renderDropdown={renderDropdown}>{render}</Dropdown>)
    expect(render).toHaveBeenCalledWith(expect.anything())
    expect(renderDropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
        ref: expect.anything(),
        style: expect.any(Object),
      }),
    )
  })

  it('should pass down the open state', () => {
    const renderDropdown = jest.fn(() => null)
    mount(
      <Dropdown open={true} renderDropdown={renderDropdown}>
        {jest.fn(() => null)}
      </Dropdown>,
    )
    expect(renderDropdown).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    )
  })

  it("shouldn't add a <ClickOutside /> component if `onClickOutside` is not provided", () => {
    const renderDropdown = jest.fn(() => null)
    const wrapper = mount(
      <Dropdown renderDropdown={renderDropdown}>
        {jest.fn(() => null)}
      </Dropdown>,
    )
    expect(wrapper.find(ClickOutside)).toHaveLength(0)
  })

  it('should add a <ClickOutside /> component if `onClickOutside` is provided', () => {
    const renderDropdown = jest.fn(() => null)
    const wrapper = mount(
      <Dropdown onClickOutside={jest.fn()} renderDropdown={renderDropdown}>
        {jest.fn(() => null)}
      </Dropdown>,
    )
    expect(wrapper.find(ClickOutside).first()).toBeDefined()
  })
})
