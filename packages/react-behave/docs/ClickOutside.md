# ClickOutside

[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref

Notify for each click outside a component.

## Usage

```jsx
import React, { Component } from 'react';
import { ClickOutside } from 'react-behave';

class App extends Component {
  handleClickOutside(event) {
    console.log('click', event);
  }

  render() {
    return (
      <ClickOutside
        onClickOutside={this.handleClickOutside}
        render={ref => <p ref={ref}>Don't click on me.</p>}
      />
    );
  }
}
```

## Props

### `onClickOutside`: `Function`

_Parameters_: `event: MouseEvent`

Called for each click outside the component.

### `render`: `Function`

_Parameters_: `ref: Object|Function`

Renders the component.
`ref` must be passed to the component in order to work.
