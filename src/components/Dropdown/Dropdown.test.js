import React from 'react'
import Dropdown from './Dropdown'
import ClickOutside from '../ClickOutside'
import { mount } from 'enzyme'

function mockRender() {
  return jest.fn(() => null)
}

describe('<Dropdown />', () => {
  it('passes down the ref to `render`', () => {
    const render = mockRender()
    mount(<Dropdown renderDropdown={mockRender()}>{render}</Dropdown>)
    expect(render).toHaveBeenCalledWith(expect.anything())
  })

  it('passes down the ref and props to `renderDropdown`', () => {
    const renderDropdown = mockRender()
    mount(
      <Dropdown open={true} renderDropdown={renderDropdown}>
        {mockRender()}
      </Dropdown>,
    )
    expect(renderDropdown).toHaveBeenCalledWith(expect.anything())
  })

  it("doesn't call `renderDropdown` when not opened", () => {
    const renderDropdown = mockRender()
    mount(<Dropdown renderDropdown={renderDropdown}>{mockRender()}</Dropdown>)
    expect(renderDropdown).not.toHaveBeenCalled()
  })

  it("shouldn't add a <ClickOutside /> component if `onClickOutside` is not provided", () => {
    const renderDropdown = mockRender()
    const wrapper = mount(
      <Dropdown open={true} renderDropdown={renderDropdown}>
        {mockRender()}
      </Dropdown>,
    )
    expect(wrapper.find(ClickOutside)).toHaveLength(0)
  })

  it('should add a <ClickOutside /> component if `onClickOutside` is provided', () => {
    const renderDropdown = mockRender()
    const wrapper = mount(
      <Dropdown
        onClickOutside={mockRender()}
        open={true}
        renderDropdown={renderDropdown}
      >
        {mockRender()}
      </Dropdown>,
    )
    expect(wrapper.find(ClickOutside).first()).toBeDefined()
  })
})
