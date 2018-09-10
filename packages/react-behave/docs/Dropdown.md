<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/Dropdown/Dropdown.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# Dropdown

[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref
[react-popper]: https://github.com/FezVrasta/react-popper
[popper-props]: https://github.com/FezVrasta/react-popper#children
[popper-placements]: https://popper.js.org/popper-documentation.html#Popper.placements
[popper-modifiers]: https://popper.js.org/popper-documentation.html#modifiers

Render a dropdown around a component.

## Usage

```jsx
import React, { Component } from 'react'
import { Dropdown } from 'react-behave'

class App extends Component {
  state = {
    open: false,
  }

  handleClickOutside = () => {
    this.setState({ open: false })
  }

  toggleDropDown = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  render() {
    return (
      <Dropdown
        onClickOutside={this.handleClickOutside}
        open={this.state.open}
        renderDropdown={({ open, ref, style }) =>
          open && (
            <ul ref={ref} style={style}>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          )
        }
      >
        {ref => (
          <button ref={ref} onClick={this.toggleDropDown}>
            Open drop down
          </button>
        )}
      </Dropdown>
    )
  }
}
```

## Props

### `children`: `Function`

_Parameters_: `ref: Object|Function`

Render the reference component of the dropdown.
`ref` must be passed to the component in order to position correctly the dropdown.

### `renderDropdown`: `Function`

_Parameters_: `ref: Object|Function`, `popperProps: Object`

Render the dropdown.
`ref` must be passed to the component in order to position correctly the dropdown.
`popperProps` is the object containing styles for positioning that need to be applied on the dropdown component.
This object is the same as the [one provided by react-popper][popper-props] without the `ref`.

### `modifiers`: `Object` (optional)

_Default value_: `{}`

Modifiers used to alter the behavior of your poppers.

In addition to the default modifiers, `minWidthModifier` is added.
It ensures for top or bottom placements that the width of the dropdown is greater or equal to the width of the reference.

See [PopperJS's modifiers][popper-modifiers].

### `onClickOutside`: `Function` (optional)

_Parameters_: `event: MouseEvent`

Called for each click outside the dropdown component.

### `open`: `Boolean` (optional)

_Default value_: `false`

Whether the dropdown should be opened or not.

### `placement`: `Enum` (optional)

_Default value_: `'bottom-start'`

Placement of the dropdown.

Must be one of [PopperJS's placement][popper-placements].
