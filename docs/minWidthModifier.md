# minWidthModifier

A [PopperJS modifier](https://popper.js.org/popper-documentation.html#modifiers) that ensures for top or bottom placements that the width of the popper is greater or equal to the width of the reference.

## Usage

```jsx
import { Manager, Popper, Reference } from 'react-popper'
import { minWidthModifier } from 'react-behave'

class App extends React.Component {
  state = { open: false }

  toggleDropdown = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  render() {
    const { open } = this.state

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <button ref={ref} onClick={this.toggleDropdown}>
              Open dropdown
            </button>
          )}
        </Reference>

        {open && (
          <Popper placement="bottom-start" modifiers={{ minWidthModifier }}>
            {({ ref, style }) => (
              <div ref={ref} style={style}>
                Popper element
              </div>
            )}
          </Popper>
        )}
      </Manager>
    )
  }
}
```
