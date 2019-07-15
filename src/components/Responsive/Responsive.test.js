import React from 'react'
import { render } from 'react-testing-library'
import { Responsive } from './Responsive'

describe('<Responsive />', () => {
  let initialInnerWidth

  beforeEach(() => {
    initialInnerWidth = window.innerWidth
    jest.useFakeTimers()
  })

  afterEach(() => {
    window.innerWidth = initialInnerWidth
  })

  describe('<Responsive children />', () => {
    function createProps(props) {
      return {
        children: <p>Hello</p>,
        ...props,
      }
    }

    it('renders its content when there is no constraints', () => {
      const props = createProps()
      const { container } = render(<Responsive {...props} />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('renders its content when using `minimum`', () => {
      window.innerWidth = Responsive.defaultProps.screenSizes.md
      const props = createProps({ minimum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it("doesn't render its content when using `minimum`", () => {
      window.innerWidth = Responsive.defaultProps.screenSizes.md - 1
      const props = createProps({ minimum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(container.firstChild).toBeNull()
    })

    it('renders its content when using `maximum`', () => {
      window.innerWidth = Responsive.defaultProps.screenSizes.md
      const props = createProps({ maximum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it("doesn't render its content when using `maximum`", () => {
      window.innerWidth = Responsive.defaultProps.screenSizes.lg
      const props = createProps({ maximum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(container.firstChild).toBeNull()
    })

    it('renders its content when using `maximum` and `minimum`', () => {
      window.innerWidth = Responsive.defaultProps.screenSizes.md
      const props = createProps({ minimum: 'sm', maximum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it("doesn't render its content when using `maximum` and `minimum`", () => {
      window.innerWidth = Responsive.defaultProps.screenSizes.xl
      const props = createProps({ minimum: 'sm', maximum: 'lg' })
      const { container } = render(<Responsive {...props} />)
      expect(container.firstChild).toBeNull()
    })

    it('listen to window resizes', () => {
      window.innerWidth = Responsive.defaultProps.screenSizes.lg
      const props = createProps({ minimum: 'md' })
      const { container } = render(<Responsive {...props} />)

      window.innerWidth = Responsive.defaultProps.screenSizes.sm
      window.dispatchEvent(new Event('resize'))
      jest.runAllTimers()
      expect(container.firstChild).toBeNull()
    })
  })

  describe('<Responsive render />', () => {
    function createProps(props) {
      return {
        children: jest.fn(() => <p>Hello</p>),
        ...props,
      }
    }

    it('renders its content when there is no constraints', () => {
      const size = Responsive.defaultProps.screenSizes.md
      window.innerWidth = size
      const props = createProps()
      const { container } = render(<Responsive {...props} />)
      expect(props.children).toHaveBeenCalledWith('md', size)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('renders its content when using `minimum`', () => {
      const size = Responsive.defaultProps.screenSizes.md
      window.innerWidth = size
      const props = createProps({ minimum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(props.children).toHaveBeenCalledWith('md', size)
      expect(container.firstChild).toMatchSnapshot()
    })

    it("doesn't render its content when using `minimum`", () => {
      const size = Responsive.defaultProps.screenSizes.md - 1
      window.innerWidth = size
      const props = createProps({ minimum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(props.children).not.toHaveBeenCalled()
      expect(container.firstChild).toBeNull()
    })

    it('renders its content when using `maximum`', () => {
      const size = Responsive.defaultProps.screenSizes.md
      window.innerWidth = size
      const props = createProps({ maximum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(props.children).toHaveBeenCalledWith('md', size)
      expect(container.firstChild).toMatchSnapshot()
    })

    it("doesn't render its content when using `maximum`", () => {
      const size = Responsive.defaultProps.screenSizes.lg
      window.innerWidth = size
      const props = createProps({ maximum: 'md' })
      const { container } = render(<Responsive {...props} />)
      expect(props.children).not.toHaveBeenCalled()
      expect(container.firstChild).toBeNull()
    })

    it('renders its content when using `maximum` and `minimum`', () => {
      const size = Responsive.defaultProps.screenSizes.md
      window.innerWidth = size
      const props = createProps({ minimum: 'sm', maximum: 'lg' })
      const { container } = render(<Responsive {...props} />)
      expect(props.children).toHaveBeenCalledWith('md', size)
      expect(container.firstChild).toMatchSnapshot()
    })

    it("doesn't render its content when using `maximum` and `minimum`", () => {
      const size = Responsive.defaultProps.screenSizes.xl
      window.innerWidth = size
      const props = createProps({ minimum: 'sm', maximum: 'lg' })
      const { container } = render(<Responsive {...props} />)
      expect(props.children).not.toHaveBeenCalled()
      expect(container.firstChild).toBeNull()
    })
  })
})
