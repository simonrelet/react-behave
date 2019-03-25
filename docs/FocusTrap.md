# FocusTrap

Trap the focus in a sub-tree.

## Usage

```jsx
import React from 'react'
import { Modal } from 'some-lib'
import { FocusTrap } from 'react-behave'

class App extends React.Component {
  state = { modalVisible: false }

  open = () => {
    this.setState({ modalVisible: true })
  }

  close = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <>
        <button autoFocus onClick={open}>
          Open Modal
        </button>

        {this.state.modalVisible && (
          <FocusTrap returnFocusOnDeactivate>
            {({ ref }) => (
              <Modal ref={ref}>
                Here is a focus trap <a href="#1">with</a> <a href="#2">some</a>{' '}
                <a href="#3">focusable</a> parts.
                <br />
                <button autoFocus onClick={close}>
                  Close
                </button>
              </Modal>
            )}
          </FocusTrap>
        )}
      </>
    )
  }
}
```

## Props

### `children`: `Function`

_Parameters_: `props: Object`

Renders the children.
The `props` object contains:

- `ref: Object`:
  The ref to apply on the trapped element.
  This is required in order for the component to work.
- `fallbackRef: Object`: The ref to apply on the fallback element if no focusable child has been found.

### `active`: `Boolean` (optional)

_Default value_: `true`

Whether the trap is active or not.

### `returnFocusOnDeactivate`: `Boolean` (optional)

Whether to give the focus back to the element that initialy had it.
