import centered from '@storybook/addon-centered/react'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Manager, Popper, Reference } from 'react-popper'
import { minWidthModifier } from './minWidthModifier'

const stories = storiesOf('minWidthModifier', module)
stories.addDecorator(centered)

stories.add('Apply min width if needed', () => (
  <DropdownButton
    buttonText={text('Button text', 'Click on me to open the popper')}
    popperText={text('Popper text', 'Popper element')}
  />
))

function DropdownButton({ buttonText, popperText }) {
  const [open, setOpen] = React.useState(false)

  function toggleDropdown() {
    setOpen(open => !open)
  }

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button ref={ref} onClick={toggleDropdown}>
            {buttonText}
          </button>
        )}
      </Reference>

      {open && (
        <Popper placement="bottom-start" modifiers={{ minWidthModifier }}>
          {({ ref, style }) => (
            <div ref={ref} style={{ ...style, backgroundColor: '#eee' }}>
              {popperText}
            </div>
          )}
        </Popper>
      )}
    </Manager>
  )
}
