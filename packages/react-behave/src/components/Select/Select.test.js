import React from 'react'
import { mount } from 'enzyme'
import Select from './Select'
import Dropdown from '../Dropdown'

const items = [
  { key: 'apple', label: 'Apple' },
  { key: 'blueberry', label: 'Blueberry' },
  { key: 'grapefruit', label: 'Grapefruit' },
  { key: 'melon', label: 'Melon' },
  { key: 'orange', label: 'Orange' },
  { key: 'peach', label: 'Peach' },
  { key: 'pineapple', label: 'Pineapple' },
  { key: 'raspberry', label: 'Raspberry' },
  { key: 'raspberry-papple', label: 'Raspberry papple melon' },
  { key: 'strawberry', label: 'Strawberry' },
  { key: 'watermelon', label: 'Watermelon' },
]

function selectTest(props = {}) {
  return (
    <Select
      items={items}
      getItemLabel={item => item.label}
      getItemValue={item => item.key}
      onChange={jest.fn()}
      {...props}
    />
  )
}

describe('<Select />', () => {
  describe('Acceptance tests', () => {
    const wrapper = mount(selectTest())
    const wrapperButton = wrapper.find('button')

    it('opens the dropdown when click on button', () => {
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)

      wrapperButton.simulate('click')

      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('displays the list of items', () => {
      expect(wrapper.find('ul').children()).toHaveLength(items.length)
    })

    it('notifies on item click', () => {
      const index = 4
      wrapper
        .find('ul')
        .childAt(index)
        .simulate('click')
      expect(wrapper.prop('onChange')).toHaveBeenCalledWith(items[index])
    })

    it('closes the dropdown after selection', () => {
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })
  })

  describe('Open and close dropdown', () => {
    const wrapper = mount(selectTest())
    const wrapperButton = wrapper.find('button')

    it('closed by default', () => {
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it('opens on click', () => {
      wrapperButton.simulate('click')
      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('closes on click', () => {
      wrapperButton.simulate('click')
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it("opens on 'ArrowDown'", () => {
      wrapperButton.simulate('keyDown', { key: 'ArrowDown' })
      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it("closes on 'Escape'", () => {
      wrapper.find('ul').simulate('keyDown', { key: 'Escape' })
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it("opens on 'ArrowUp'", () => {
      wrapperButton.simulate('keyDown', { key: 'ArrowUp' })
      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('closes on click outside', () => {
      wrapper.find(Dropdown).prop('onClickOutside')()
      wrapper.update()
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it("closes on 'Enter'", () => {
      wrapperButton.simulate('click')
      const items = wrapper.find('ul')
      items.simulate('keyDown', { key: 'ArrowDown' })
      items.simulate('keyDown', { key: 'Enter' })
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })

    it('closes on item click', () => {
      wrapperButton.simulate('click')
      wrapper
        .find('ul')
        .childAt(0)
        .simulate('click')
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })

    it("closes on 'Tab'", () => {
      wrapperButton.simulate('click')
      wrapper.find('ul').simulate('keyDown', { key: 'Tab' })
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })
  })
})

describe('<Select filterable />', () => {
  describe('Acceptance tests', () => {
    const wrapper = mount(selectTest({ filterable: true }))
    const wrapperButton = wrapper.find('button')
    const key = 'm'

    it('opens the dropdown on key press', () => {
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)

      wrapperButton.simulate('keyPress', { key })

      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.state('inputValue')).toBe(key)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('displays the filtered list of items', () => {
      expect(wrapper.find('ul').children()).toHaveLength(3)
    })

    it('displays the filter value in the input', () => {
      expect(wrapper.find('input').prop('value')).toBe(key)
    })

    it('notifies on item click', () => {
      wrapper
        .find('ul')
        .childAt(0)
        .simulate('click')
      expect(wrapper.prop('onChange')).toHaveBeenCalledWith(items[3])
    })

    it('closes the dropdown after selection', () => {
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })
  })

  describe('Open and close dropdown', () => {
    const wrapper = mount(selectTest({ filterable: true }))
    const wrapperButton = wrapper.find('button')

    it('closed by default', () => {
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it('opens on click', () => {
      wrapperButton.simulate('click')
      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('closes on click', () => {
      wrapperButton.simulate('click')
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it("opens on 'ArrowDown'", () => {
      wrapperButton.simulate('keyDown', { key: 'ArrowDown' })
      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it("closes on 'Escape'", () => {
      wrapper.find('input').simulate('keyDown', { key: 'Escape' })
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it("opens on 'ArrowUp'", () => {
      wrapperButton.simulate('keyDown', { key: 'ArrowUp' })
      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it('closes on click outside', () => {
      wrapper.find(Dropdown).prop('onClickOutside')()
      wrapper.update()
      expect(wrapper.find('ul')).toHaveLength(0)
      expect(wrapper.state('open')).toBe(false)
    })

    it('opens on key press', () => {
      wrapperButton.simulate('keyPress', { key: 'p' })
      expect(wrapper.state('open')).toBe(true)
      expect(wrapper.find('ul')).toHaveLength(1)
    })

    it("closes on 'Enter'", () => {
      wrapper.find('input').simulate('keyDown', { key: 'Enter' })
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })

    it('closes on item click', () => {
      wrapperButton.simulate('click')
      wrapper
        .find('ul')
        .childAt(0)
        .simulate('click')
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })

    it("closes on 'Tab'", () => {
      wrapperButton.simulate('click')
      wrapper.find('input').simulate('keyDown', { key: 'Tab' })
      expect(wrapper.state('open')).toBe(false)
      expect(wrapper.find('ul')).toHaveLength(0)
    })
  })
})
