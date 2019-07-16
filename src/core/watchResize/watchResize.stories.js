import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { watchResize } from './watchResize'

const stories = storiesOf('watchResize', module)
stories.addDecorator(centered)

stories.add('Watch resizes', () => <Story />)

function Story() {
  const element = React.useRef(null)
  const [size, setSize] = React.useState(null)

  React.useEffect(() => {
    return watchResize(element.current, setSize)
  }, [])

  return (
    <div
      ref={element}
      style={{ height: '50vh', width: '50vw', backgroundColor: '#eee' }}
    >
      <p>Resize me</p>

      <pre>
        <code>{JSON.stringify(size, null, 2)}</code>
      </pre>
    </div>
  )
}
