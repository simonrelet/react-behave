# ClickOutside

[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref

Notify for each click outside a component.

## Usage

```jsx
import React from 'react'
import { ClickOutside } from 'react-behave'

class App extends React.Component {
  handleClickOutside(mouseEvent) {
    console.log('click outside', mouseEvent)
  }

  handleEscape(keyEvent) {
    console.log('escape', keyEvent)
  }

  render() {
    return (
      <ClickOutside
        onClickOutside={this.handleClickOutside}
        onEscape={this.handleEscape}
      >
        {({ ref }) => <p ref={ref}>Don't click on me.</p>}
      </ClickOutside>
    )
  }
}
```

## Props

### `children`: `Function`

_Parameters_: `{ ref: Object|Function }`

Renders the component.
`ref` must be passed to the component in order to work.

### `onClickOutside`: `Function`

_Parameters_: `event: MouseEvent`

Called for each click outside the component.

### `onEscape`: `Function` (optional)

_Parameters_: `event: KeyboardEvent`

Called each time the Escape key is pressed.
