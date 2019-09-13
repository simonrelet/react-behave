import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { scrollableDecorator } from '../../.storybook/decorators'
import { usePopper } from './usePopper'

const stories = storiesOf('usePopper', module)
stories.addDecorator(scrollableDecorator)

stories.add('Place a popper next to a reference', () => (
  <PopperStory
    placement={select('placement', usePopper.PLACEMENTS, 'bottom')}
    referenceText={text('Reference text', 'Reference')}
    popperText={text('Popper text', 'Popper')}
  />
))

function PopperStory({ placement, referenceText, popperText }) {
  const referenceRef = React.useRef(null)
  const popperRef = React.useRef(null)

  const { style, scheduleUpdate } = usePopper(referenceRef, popperRef, {
    placement,
  })

  React.useLayoutEffect(() => {
    scheduleUpdate()
  }, [scheduleUpdate, referenceText, popperText])

  return (
    <>
      <Reference ref={referenceRef}>{referenceText}</Reference>
      <Popper ref={popperRef} style={style}>
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

stories.add('Toggle popper', () => (
  <TogglePopperStory
    placement={select('placement', usePopper.PLACEMENTS, 'bottom')}
    referenceText={text('Reference text', 'Open popper')}
    popperText={text('Popper text', 'Popper')}
  />
))

function TogglePopperStory({ placement, referenceText, popperText }) {
  const referenceRef = React.useRef(null)
  const popperRef = React.useRef(null)
  const [opened, setOpened] = React.useState(false)
  const { style, scheduleUpdate } = usePopper(referenceRef, popperRef, {
    disabled: !opened,
    placement,
  })

  React.useLayoutEffect(() => {
    scheduleUpdate()
  }, [scheduleUpdate, referenceText, popperText])

  return (
    <>
      <button ref={referenceRef} onClick={() => setOpened(opened => !opened)}>
        {referenceText}
      </button>

      {opened && (
        <div ref={popperRef} style={style}>
          {popperText}
        </div>
      )}
    </>
  )
}
