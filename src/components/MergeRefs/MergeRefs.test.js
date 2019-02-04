import React from 'react'
import { render } from 'react-testing-library'
import MergeRefs from './MergeRefs'

function createProps(props) {
  return {
    children: jest.fn(({ ref }) => <p ref={ref}>Hello</p>),
    refs: [],
    ...props,
  }
}

describe('<MergeRefs />', () => {
  it('renders its content', () => {
    const props = createProps()
    const { container } = render(<MergeRefs {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('merges refs', () => {
    const props = createProps({ refs: [React.createRef(), jest.fn()] })
    const { container } = render(<MergeRefs {...props} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(props.refs[0].current).toEqual(container.firstChild)
    expect(props.refs[1]).toHaveBeenCalledWith(container.firstChild)
  })
})
