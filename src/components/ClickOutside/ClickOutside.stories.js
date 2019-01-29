import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered'
import { storiesOf } from '@storybook/react'
import React from 'react'
import ClickOutside from './ClickOutside'

const stories = storiesOf('ClickOutside', module)

const style = {
  border: '1px solid #ccc',
  padding: '0.5rem 1rem',
}

stories.addDecorator(centered).add('Render function', () => (
  <ClickOutside onClickOutside={action('onClickOutside')}>
    {ref => (
      <p ref={ref} style={style}>
        Don't click on me.
      </p>
    )}
  </ClickOutside>
))
