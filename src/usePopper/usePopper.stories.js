import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { scrollableDecorator } from '../../.storybook/decorators'
import { minWidthModifier } from '../minWidthModifier'
import { usePopper } from './usePopper'

const stories = storiesOf('usePopper', module)
stories.addDecorator(scrollableDecorator)

stories.add('Place a popper next to a reference', () => (
  <PopperStory
    placement={select('placement', usePopper.placements, 'bottom')}
    referenceText={text('Reference text', 'Reference')}
    popperText={text('Popper text', 'Popper')}
    addMinWidthModifier={!!boolean('Add minWidthModifier', false)}
  />
))

const POPPER_MODIFIERS = { minWidthModifier }

function PopperStory({
  placement,
  referenceText,
  popperText,
  addMinWidthModifier,
}) {
  const [reference, setReference] = React.useState(null)
  const [popper, setPopper] = React.useState(null)

  const { style, scheduleUpdate } = usePopper(reference, popper, {
    placement,
    modifiers: addMinWidthModifier ? POPPER_MODIFIERS : undefined,
  })

  React.useLayoutEffect(() => {
    scheduleUpdate()
  }, [scheduleUpdate, referenceText, popperText])

  return (
    <>
      <Reference ref={setReference}>{referenceText}</Reference>
      <Popper ref={setPopper} style={style}>
        {popperText}
      </Popper>
    </>
  )
}

const Reference = React.forwardRef((props, ref) => {
  return <Block ref={ref} style={{ backgroundColor: '#8bc34a' }} {...props} />
})

const Popper = React.forwardRef(({ style, ...rest }, ref) => {
  return (
    <Block
      ref={ref}
      style={{ backgroundColor: '#ffeb3b', ...style }}
      {...rest}
    />
  )
})

const Block = React.forwardRef(({ style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      {...props}
    />
  )
})
