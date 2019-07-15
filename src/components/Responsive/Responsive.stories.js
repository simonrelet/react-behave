import { object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { Component } from 'react'
import { watchResize } from '../../core/watchResize'
import { getScreenSize } from '../../core/getScreenSize'
import { Responsive } from './Responsive'

const defaultScreenSizes = Responsive.defaultProps.screenSizes

const stories = storiesOf('Responsive', module)

stories.add('Render function', () => {
  const screenSizes = object('Screen sizes', defaultScreenSizes)
  const screenSizesOptions = Object.keys(screenSizes).reduce(
    (acc, size) => ({ ...acc, [size]: size }),
    { '': 'None' },
  )

  return (
    <Responsive
      maximum={select('Maximum', screenSizesOptions, '')}
      minimum={select('Minimum', screenSizesOptions, '')}
      screenSizes={screenSizes}
    >
      {screenSize => (
        <div>
          <h3>
            The screen size is '{screenSize}
            '.
          </h3>
          <em>Use the "Viewport" and "Knobs" tabs bellow to play around.</em>
        </div>
      )}
    </Responsive>
  )
})

stories.add('Render children', () => (
  <Responsive maximum="md" minimum="sm">
    <p>I'm only visible on 'sm' and 'md' screens</p>
  </Responsive>
))

class LocalResponsive extends Component {
  ref = React.createRef()
  stopWatching = null

  componentDidMount() {
    this.stopWatching = watchResize(this.ref.current, () => this.forceUpdate())
  }

  componentWillUnmount() {
    this.stopWatching()
  }

  getSize() {
    if (this.ref.current) {
      const { height, width } = this.ref.current.getBoundingClientRect()
      return {
        width: Math.floor(width),
        height: Math.floor(height),
      }
    }

    return {
      width: 0,
      height: 0,
    }
  }

  getScreenSize(width) {
    return getScreenSize(Responsive.defaultProps.screenSizes, width)
  }

  render() {
    const { width, height } = this.getSize()
    return (
      <div ref={this.ref}>
        <ul>
          <li>
            Width: {width}
            px
          </li>
          <li>
            Height: {height}
            px
          </li>
          <li>Screen size: {this.getScreenSize(width)}</li>
        </ul>
      </div>
    )
  }
}

stories.add('Local responsiveness', () => <LocalResponsive />)
