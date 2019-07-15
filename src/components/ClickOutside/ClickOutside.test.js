import React from 'react'
import { fireEvent, render } from 'react-testing-library'
import { ClickOutside } from './ClickOutside'

function createProps(props) {
  return {
    children: jest.fn(({ ref }) => <p ref={ref}>Hello</p>),
    onClickOutside: jest.fn(),
    ...props,
  }
}

describe('<ClickOutside />', () => {
  it('renders its content', () => {
    const props = createProps()
    const { container } = render(<ClickOutside {...props} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(props.children).toHaveBeenCalledTimes(1)
  })

  it('notifies on a click outside', () => {
    const props = createProps()
    const { container } = render(<ClickOutside {...props} />)
    fireEvent.mouseDown(container)
    expect(props.onClickOutside).toHaveBeenCalledTimes(1)
  })

  it("doesn't notify on a click inside", () => {
    const props = createProps()
    const { container } = render(<ClickOutside {...props} />)
    fireEvent.mouseDown(container.firstChild)
    expect(props.onClickOutside).not.toHaveBeenCalled()
  })

  it("doesn't notify if there is no ref", () => {
    const props = createProps({ children: jest.fn(() => null) })
    const { container } = render(<ClickOutside {...props} />)
    fireEvent.mouseDown(container)
    expect(props.onClickOutside).not.toHaveBeenCalled()
  })
})
