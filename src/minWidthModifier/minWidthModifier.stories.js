import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { scrollableDecorator } from '../../.storybook/decorators'
import { usePopper } from '../usePopper'
import { minWidthModifier } from './minWidthModifier'

const stories = storiesOf('minWidthModifier', module)
stories.addDecorator(scrollableDecorator)

stories.add('Apply min width if needed', () => (
  <DropdownButton
    buttonText={text('Button text', 'Click on me to open the popper')}
    popperText={text('Popper text', 'Popper element')}
  />
))

const MODIFIERS = { minWidthModifier }

function DropdownButton({ buttonText, popperText }) {
  const [reference, setReference] = React.useState(null)
  const [popper, setPopper] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const { style } = usePopper(reference, popper, {
    placement: 'bottom-start',
    modifiers: MODIFIERS,
  })

  return (
    <>
      <button ref={setReference} onClick={() => setOpen(open => !open)}>
        {buttonText}
      </button>

      {open && (
        <div ref={setPopper} style={{ ...style, backgroundColor: '#eee' }}>
          {popperText}
        </div>
      )}
    </>
  )
}
