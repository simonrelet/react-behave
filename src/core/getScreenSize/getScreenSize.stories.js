import centered from '@storybook/addon-centered/react'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { getScreenSize } from '../../core/getScreenSize'
import { watchResize } from '../../core/watchResize'

const DEFAULT_SCREEN_SIZES = {
  xs: 0,
  sm: 200,
  md: 300,
  lg: 400,
  xl: 500,
}

const stories = storiesOf('getScreenSize', module)
stories.addDecorator(centered)

stories.add('Get a local size', () => <LocalResponsive />)

function LocalResponsive() {
  const screenSizes = object('Screen sizes', DEFAULT_SCREEN_SIZES)
  const element = React.useRef(null)
  const [size, setSize] = React.useState(null)

  React.useEffect(() => {
    return watchResize(element.current, setSize)
  }, [])

  const screenSize =
    size == null ? null : getScreenSize(screenSizes, size.width)

  return (
    <div
      ref={element}
      style={{ height: '50vh', width: '50vw', backgroundColor: '#eee' }}
    >
      <p>Resize me</p>

      <pre>
        <code>{JSON.stringify(size, null, 2)}</code>
      </pre>

      <p>Screen size: {screenSize}</p>
    </div>
  )
}
