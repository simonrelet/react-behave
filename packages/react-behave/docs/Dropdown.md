<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/Dropdown/Dropdown.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# Dropdown

[popper-children]: https://github.com/FezVrasta/react-popper#children
[popper-placements]: https://popper.js.org/popper-documentation.html#Popper.placements

Render a dropdown around a component.

## Usage

```jsx
import React from 'react'
import { Dropdown } from 'react-behave'

class App extends React.Component {
  state = {
    open: false,
  }

  handleClickOutside = () => {
    this.setState({ open: false })
  }

  toggleDropdown = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <Dropdown
        onClickOutside={this.handleClickOutside}
        open={this.state.open}
        renderDropdown={({ ref, style }) => (
          <ul ref={ref} style={style}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        )}
      >
        {({ ref }) => (
          <button ref={ref} onClick={this.toggleDropdown}>
            Open dropdown
          </button>
        )}
      </Dropdown>
    )
  }
}
```

## Props

### `children`: `Function`

_Parameters_: `props: Object`

Render the reference component of the dropdown.

The `props` object contains:

- `ref: Object|Function`: Must be passed to the component in order to position correctly the dropdown.

### `renderDropdown`: `Function`

_Parameters_: `popperProps: Object`

Render the dropdown.

See react-popper's [`Popper.children`][popper-children].

### `open`: `Boolean` (optional)

_Default value_: `false`

Whether the dropdown should be opened or not.

### `placement`: `Enum` (optional)

_Default value_: `'bottom-start'`

Placement of the dropdown.

Must be one of [PopperJS's placement][popper-placements].
