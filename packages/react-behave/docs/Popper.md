<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/Popper/Popper.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# Popper

[react-popper]: https://github.com/FezVrasta/react-popper
[popper-modifiers]: https://popper.js.org/popper-documentation.html#modifiers

Render a popper.

This component is a wrapper around react-popper's [`Popper`][react-popper] component.

## Usage

```jsx
import React from 'react'
import {
  Popper,
  PopperManager,
  PopperReference
} from 'react-behave'

class App extends React.Component {
  state = {
    open: false,
  }

  handleClickOutside = () => {
    this.setState({ open: false })
  }

  togglePopper = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <PopperManager>
        <PopperReference>
          {({ ref }) => (
            <button ref={ref} onClick={this.togglePopper}>
              Open popper
            </button>
          )}
        </PopperReference>

        {this.state.open && (
          <Popper onClickOutside={this.handleClickOutside}>
            {({ ref, style, placement, arrowProps }) => (
              <div ref={ref} style={style} x-placement={placement}>
                Popper element
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            )}
          </Popper>
        )}
      </PopperManager>
    )
  }
}
```

## Props

### `modifiers`: `Object` (optional)

_Default value_: `{}`

Modifiers used to alter the behavior of your poppers.

In addition to the default modifiers, `minWidthModifier` is added.
It ensures for top or bottom placements that the width of the popper is greater or equal to the width of the reference.

See [PopperJS's modifiers][popper-modifiers].

### `onClickOutside`: `Function` (optional)

_Parameters_: `event: MouseEvent`

Called for each click outside the popper component.
