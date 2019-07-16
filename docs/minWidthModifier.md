# minWidthModifier

A [PopperJS modifier](https://popper.js.org/popper-documentation.html#modifiers)
that ensures for top or bottom placements that the width of the popper is
greater or equal to the width of the reference.

## Usage

```jsx
import React from 'react'
import { Manager, Popper, Reference } from 'react-popper'
import { minWidthModifier } from 'react-behave'

function DropdownButton() {
  const [open, setOpen] = React.useState(false)

  function toggleDropdown() {
    setOpen(open => !open)
  }

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button ref={ref} onClick={toggleDropdown}>
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
```
