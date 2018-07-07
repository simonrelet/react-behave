<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/Dropdown/Dropdown.js instead.
-->

# Dropdown

[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref
[react-popper]: https://github.com/FezVrasta/react-popper
[popper-props]: https://github.com/FezVrasta/react-popper#children
[popper-placements]: https://popper.js.org/popper-documentation.html#Popper.placements

Render a dropdown around a component.

## Usage

```jsx
import React, { Component } from 'react';
import { Dropdown } from 'react-behave';

class App extends Component {
  state = {
    open: false,
  };

  handleClickOutside = () => {
    this.setState({ open: false });
  };

  toggleDropDown = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    return (
      <Dropdown
        onClickOutside={this.handleClickOutside}
        open={this.state.open}
        renderDropDown={(ref, { style }) => (
          <ul ref={ref} style={style}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        )}
      >
        {ref => (
          <button ref={ref} onClick={this.toggleDropDown}>
            Open drop down
          </button>
        )}
      </Dropdown>
    );
  }
}
```

## Props

### `children`: `Function`

_Parameters_: `ref: Object|Function`

Render the reference component of the dropdown.
`ref` must be passed to the component in order to position correctly the dropdown.

### `renderDropDown`: `Function`

_Parameters_: `ref: Object|Function`, `popperProps: Object`

Render the dropdown.
`ref` must be passed to the component in order to position correctly the dropdown.
`popperProps` is the object containing styles for positioning that need to be applied on the dropdown component.
This object is the same as the [one provided by react-popper][popper-props] without the `ref`.

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
