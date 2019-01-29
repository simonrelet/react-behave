import getOtherProps from './getOtherProps'

describe('getOtherProps', () => {
  it('gets other props', () => {
    const component = {
      propTypes: {
        prop1: true,
        prop2: true,
        prop3: true,
      },
    }

    const otherProps = {
      otherProp1: true,
      otherProp2: true,
    }

    const props = {
      ...otherProps,
      prop2: true,
    }

    expect(getOtherProps(component, props)).toEqual(otherProps)
  })

  it('get the props if there is no `propTypes`', () => {
    const component = {}

    const props = {
      otherProp1: true,
      otherProp2: true,
      prop2: true,
    }

    expect(getOtherProps(component, props)).toEqual(props)
  })

  it('get an empty object if there is no props', () => {
    const component = {
      propTypes: {
        prop1: true,
        prop2: true,
        prop3: true,
      },
    }

    const props = {}

    expect(getOtherProps(component, props)).toEqual(props)
  })
})
