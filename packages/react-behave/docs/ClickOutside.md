# ClickOutside

[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref

> Notify for each click outside a reference HTML element.

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

_Mandatory props are marked with a `*`._

| Name                                           |  Type  | Default value | Description                                                                                         |
| ---------------------------------------------- | :----: | :-----------: | --------------------------------------------------------------------------------------------------- |
| <strong><code>onClickOutside</code>\*</strong> | `func` |               | Called for each click outside the reference HTML element. The parameter is the `MouseEvent` object. |
| <strong><code>render</code>\*</strong>         | `func` |               | Render function. The parameter is a [ref object][create-ref] to set on the reference HTML element.  |
