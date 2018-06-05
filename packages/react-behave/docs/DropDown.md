# DropDown

[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref
[react-popper]: https://github.com/FezVrasta/react-popper
[popper-props]: https://github.com/FezVrasta/react-popper#children

> Render a drop down over a reference HTML element using [react-popper][react-popper].

## Usage

```jsx
import React, { Component } from 'react';
import { DropDown } from 'react-behave';

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
      <DropDown
        onClickOutside={this.handleClickOutside}
        open={this.state.open}
        render={ref => (
          <button ref={ref} onClick={this.toggleDropDown}>
            Open drop down
          </button>
        )}
        renderDropDown={(ref, { style }) => (
          <ul ref={ref} style={style}>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        )}
      />
    );
  }
}
```

## Render functions

### `render(ref)`

Render the reference of the drop down.
The parameter is a [ref object][create-ref] to set on the reference HTML element.

### `renderDropDown(ref, props)`

Render the drop down.
The first parameter is a [ref object][create-ref] to set on the reference HTML element.
The second parameter is the props object containing styles for positioning that need to be applied on the reference HTML element of the drop down.
This object is the same as the [one provided by react-popper][popper-props] without the `ref`.

## Props

_Mandatory props are marked with a `*`._

| Name                                           |  Type  | Default value | Description                                                                                         |
| ---------------------------------------------- | :----: | :-----------: | --------------------------------------------------------------------------------------------------- |
| `onClickOutside`                               | `func` |               | Called for each click outside the drop down HTML element. The parameter is the `MouseEvent` object. |
| `open`                                         | `bool` |    `false`    | Whether the drop down should be opened or not.                                                      |
| <strong><code>render</code>\*</strong>         | `func` |               | Render function for the reference. See [render functions](#renderref).                              |
| <strong><code>renderDropDown</code>\*</strong> | `func` |               | Render function for the drop down. See [render functions](#renderdropdownref-props).                |
