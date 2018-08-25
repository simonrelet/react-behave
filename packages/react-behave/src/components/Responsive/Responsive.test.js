import { mount } from 'enzyme'
import React from 'react'
import Responsive from './Responsive'

const screenSizes = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

let initialInnerWidth

async function wait(milliseconds = 0) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds)
  })
}

describe('<Responsive />', () => {
  beforeEach(() => {
    initialInnerWidth = window.innerWidth
  })

  afterEach(() => {
    window.innerWidth = initialInnerWidth
  })

  describe('<Responsive children />', () => {
    it('renders its content when there is no constraints', () => {
      const wrapper = mount(
        <Responsive screenSizes={screenSizes}>
          <p>Hello</p>
        </Responsive>,
      )
      expect(wrapper.find('p').first()).toBeDefined()
    })

    it('renders its content when using `minimum`', () => {
      window.innerWidth = screenSizes.md
      const wrapper = mount(
        <Responsive screenSizes={screenSizes} minimum="md">
          <p>Hello</p>
        </Responsive>,
      )
      expect(wrapper.find('p').first()).toBeDefined()
    })

    it("doesn't render its content when using `minimum`", () => {
      window.innerWidth = screenSizes.md - 1
      const wrapper = mount(
        <Responsive screenSizes={screenSizes} minimum="md">
          <p>Hello</p>
        </Responsive>,
      )
      expect(wrapper.find('p')).toHaveLength(0)
    })

    it('renders its content when using `maximum`', () => {
      window.innerWidth = screenSizes.md
      const wrapper = mount(
        <Responsive screenSizes={screenSizes} maximum="md">
          <p>Hello</p>
        </Responsive>,
      )
      expect(wrapper.find('p').first()).toBeDefined()
    })

    it("doesn't render its content when using `maximum`", () => {
      window.innerWidth = screenSizes.lg
      const wrapper = mount(
        <Responsive screenSizes={screenSizes} maximum="md">
          <p>Hello</p>
        </Responsive>,
      )
      expect(wrapper.find('p')).toHaveLength(0)
    })

    it('renders its content when using `maximum` and `minimum`', () => {
      window.innerWidth = screenSizes.md
      const wrapper = mount(
        <Responsive screenSizes={screenSizes} maximum="lg" minimum="sm">
          <p>Hello</p>
        </Responsive>,
      )
      expect(wrapper.first()).toBeDefined()
    })

    it("doesn't render its content when using `maximum` and `minimum`", () => {
      window.innerWidth = screenSizes.xl
      const wrapper = mount(
        <Responsive screenSizes={screenSizes} maximum="lg" minimum="sm">
          <p>Hello</p>
        </Responsive>,
      )
      expect(wrapper.find('p')).toHaveLength(0)
    })

    it('listen to window resizes', async () => {
      expect.assertions(1)
      window.innerWidth = screenSizes.lg
      const wrapper = mount(
        <Responsive screenSizes={screenSizes} minimum="md" resizeInterval={0}>
          <div>Hello</div>
        </Responsive>,
      )
      window.innerWidth = screenSizes.sm
      window.dispatchEvent(new Event('resize'))
      await wait()
      wrapper.update()
      expect(wrapper.find('div')).toHaveLength(0)
    })
  })

  describe('<Responsive render />', () => {
    it('renders its content when there is no constraints', () => {
      const render = jest.fn()
      window.innerWidth = screenSizes.md
      mount(<Responsive screenSizes={screenSizes} children={render} />)
      expect(render).toHaveBeenCalledWith('md', screenSizes.md)
    })

    it('renders its content when using `minimum`', () => {
      const render = jest.fn()
      window.innerWidth = screenSizes.md
      mount(
        <Responsive screenSizes={screenSizes} minimum="md" children={render} />,
      )
      expect(render).toHaveBeenCalledWith('md', screenSizes.md)
    })

    it("doesn't render its content when using `minimum`", () => {
      const render = jest.fn()
      window.innerWidth = screenSizes.md - 1
      mount(
        <Responsive screenSizes={screenSizes} minimum="md" children={render} />,
      )
      expect(render).not.toHaveBeenCalled()
    })

    it('renders its content when using `maximum`', () => {
      const render = jest.fn()
      window.innerWidth = screenSizes.md
      mount(
        <Responsive screenSizes={screenSizes} maximum="md" children={render} />,
      )
      expect(render).toHaveBeenCalledWith('md', screenSizes.md)
    })

    it("doesn't render its content when using `maximum`", () => {
      const render = jest.fn()
      window.innerWidth = screenSizes.lg
      mount(
        <Responsive screenSizes={screenSizes} maximum="md" children={render} />,
      )
      expect(render).not.toHaveBeenCalled()
    })

    it('renders its content when using `maximum` and `minimum`', () => {
      const render = jest.fn()
      window.innerWidth = screenSizes.md
      mount(
        <Responsive
          screenSizes={screenSizes}
          maximum="lg"
          minimum="sm"
          children={render}
        />,
      )
      expect(render).toHaveBeenCalledWith('md', screenSizes.md)
    })

    it("doesn't render its content when using `maximum` and `minimum`", () => {
      const render = jest.fn()
      window.innerWidth = screenSizes.xl
      mount(
        <Responsive
          screenSizes={screenSizes}
          maximum="lg"
          minimum="sm"
          children={render}
        />,
      )
      expect(render).not.toHaveBeenCalled()
    })

    it('listen to window resizes', async () => {
      expect.assertions(1)
      const render = jest.fn()
      window.innerWidth = screenSizes.lg
      const wrapper = mount(
        <Responsive
          screenSizes={screenSizes}
          minimum="md"
          children={render}
          resizeInterval={0}
        />,
      )
      render.mockReset()
      window.innerWidth = screenSizes.sm
      window.dispatchEvent(new Event('resize'))
      await wait()
      wrapper.update()
      expect(render).not.toHaveBeenCalled()
    })
  })
})
