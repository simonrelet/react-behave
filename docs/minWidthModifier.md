# minWidthModifier

A [Popper.js modifier](https://popper.js.org/popper-documentation.html#modifiers)
that ensures for top or bottom placements that the width of the popper is
greater or equal to the width of the reference.

## Usage

```jsx
import React from 'react'
import { minWidthModifier, usePopper } from 'react-behave'

// Prefer using a constant to avoid creating new references on each render.
// Any other Popper.js modifier can be added here.
const MODIFIERS = { minWidthModifier }

function DropdownButton() {
  const [reference, setReference] = React.useState(null)
  const [popper, setPopper] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const { style } = usePopper(reference, popper, {
    placement: 'bottom-start',
    modifiers: MODIFIERS,
  })

  return (
    <>
      <button ref={setReference} onClick={() => setOpen(open => !open)}>
        Open dropdown
      </button>

      {open && (
        <div ref={setPopper} style={style}>
          Popper element
        </div>
      )}
    </>
  )
}
```
