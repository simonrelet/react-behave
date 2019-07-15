import centered from '@storybook/addon-centered'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Component from '@reactions/component'
import { FocusTrap } from './FocusTrap'
import { ClickOutside } from '../ClickOutside'
import { MergeRefs } from '../MergeRefs'

const stories = storiesOf('FocusTrap', module)

function Overlay(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    />
  )
}

const Modal = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
        backgroundColor: 'white',
      }}
      {...props}
    />
  )
})

stories.addDecorator(centered).add('Trap focus', () => (
  <Component initialState={{ open: false }}>
    {({ state, setState }) => {
      const open = () => setState({ open: true })
      const close = () => setState({ open: false })

      return (
        <>
          <button autoFocus onClick={open}>
            Open Modal
          </button>

          {state.open && (
            <Overlay>
              <ClickOutside onClickOutside={close} onEscape={close}>
                {({ ref: clickOutsideRef }) => (
                  <FocusTrap returnFocusOnDeactivate>
                    {({ ref: trapRef }) => (
                      <MergeRefs refs={[clickOutsideRef, trapRef]}>
                        {({ ref }) => (
                          <Modal ref={ref}>
                            Here is a focus trap <a href="#1">with</a>{' '}
                            <a href="#2">some</a> <a href="#3">focusable</a>
                            parts.
                            <br />
                            <button autoFocus onClick={close}>
                              Close
                            </button>
                          </Modal>
                        )}
                      </MergeRefs>
                    )}
                  </FocusTrap>
                )}
              </ClickOutside>
            </Overlay>
          )}
        </>
      )
    }}
  </Component>
))

stories.addDecorator(centered).add('Trap focus deactivation', () => (
  <Component initialState={{ active: false }}>
    {({ state, setState }) => {
      const activate = () => setState({ active: true })
      const deactivate = () => setState({ active: false })

      return (
        <>
          <button autoFocus onClick={activate}>
            Activate trap
          </button>

          <FocusTrap returnFocusOnDeactivate active={state.active}>
            {({ ref }) => (
              <p ref={ref}>
                Here is a focus trap <a href="#1">with</a> <a href="#2">some</a>{' '}
                <a href="#3">focusable</a>
                parts.
                <br />
                <button onClick={deactivate}>Deactivate trap</button>
              </p>
            )}
          </FocusTrap>
        </>
      )
    }}
  </Component>
))
