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
  const referenceRef = React.useRef(null)
  const popperRef = React.useRef(null)
  const [opened, setOpened] = React.useState(false)

  const { style } = usePopper(referenceRef, popperRef, {
    disabled: !opened,
    placement: 'bottom-start',
    modifiers: MODIFIERS,
  })

  return (
    <>
      <button ref={referenceRef} onClick={() => setOpened(opened => !opened)}>
        {buttonText}
      </button>

      {opened && (
        <div ref={popperRef} style={{ ...style, backgroundColor: '#eee' }}>
          {popperText}
        </div>
      )}
    </>
  )
}
