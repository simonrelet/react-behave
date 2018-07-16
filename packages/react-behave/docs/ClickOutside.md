<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/ClickOutside/ClickOutside.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

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
      <ClickOutside onClickOutside={this.handleClickOutside}>
        {ref => <p ref={ref}>Don't click on me.</p>}
      </ClickOutside>
    );
  }
}
```

## Props

### `children`: `Function`

_Parameters_: `ref: Object|Function`

Renders the component.
`ref` must be passed to the component in order to work.

### `onClickOutside`: `Function`

_Parameters_: `event: MouseEvent`

Called for each click outside the component.
