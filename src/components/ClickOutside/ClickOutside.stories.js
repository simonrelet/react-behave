import centered from '@storybook/addon-centered'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { ClickOutside } from './ClickOutside'

const stories = storiesOf('ClickOutside', module)

const style = {
  border: '1px solid #ccc',
  padding: '0.5rem 1rem',
}

stories.addDecorator(centered).add('Render function', () => (
  <ClickOutside onClickOutside={e => console.log('onClickOutside:', e)}>
    {({ ref }) => (
      <p ref={ref} style={style}>
        Don't click on me.
      </p>
    )}
  </ClickOutside>
))

stories.addDecorator(centered).add('Escape key', () => (
  <ClickOutside
    onClickOutside={e => console.log('onClickOutside:', e)}
    onEscape={e => console.log('onEscape:', e)}
  >
    {({ ref }) => (
      <p ref={ref} style={style}>
        Don't click on me or press Escape.
      </p>
    )}
  </ClickOutside>
))
