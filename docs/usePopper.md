# usePopper

A React hook around [Popper.js](https://popper.js.org).

## Usage

```js
import React from 'react'
import { usePopper } from 'react-behave'

function DropdownButton() {
  // Use states to manage the HTML elements to trigger updates and make sure
  // `usePopper` is up to date.
  const [reference, setReference] = React.useState(null)
  const [popper, setPopper] = React.useState(null)

  const [open, setOpen] = React.useState(false)

  const { style } = usePopper(reference, popper)

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

## Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td><code>reference</code></td>
      <td>
        <strong>HTMLElement | <a href="https://popper.js.org/popper-documentation.html#referenceObject">ReferenceObject</a> | null</strong>
        <p>
          The reference element used to position the popper.
          See more in <a href="https://popper.js.org/popper-documentation.html#new_Popper_new">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>popper</code></td>
      <td>
        <strong>HTMLElement | null</strong>
        <p>
          The HTML element used as the popper.
          See more in <a href="https://popper.js.org/popper-documentation.html#new_Popper_new">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?</code></td>
      <td>
        <strong>object</strong> <em>= <code>{}</code></em>
        <p>The hook options.</p>
      </td>
    </tr>
    <tr>
      <td><code>options?.arrow?</code></td>
      <td>
        <strong>string | HTMLElement | null</strong>
        <p>
          Selector or node used as arrow.
          See more in <a href="https://popper.js.org/popper-documentation.html#modifiers..arrow.element">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?.placement?</code></td>
      <td>
        <strong><a href="https://popper.js.org/popper-documentation.html#Popper.placements">Placement</a></strong> <em>= <code>'bottom'</code></em>
        <p>
          Popper’s placement.
          See more in <a href="https://popper.js.org/popper-documentation.html#Popper.Defaults.placement">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?.modifiers?</code></td>
      <td>
        <strong><a href="https://popper.js.org/popper-documentation.html#modifiers">Modifiers</a></strong> <em>= <code>{}</code></em>
        <p>
          List of modifiers used to modify the offsets before they are applied
          to the popper.
          They provide most of the functionalities of Popper.js.
          See more in <a href="https://popper.js.org/popper-documentation.html#Popper.Defaults.modifiers">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?.eventsEnabled?</code></td>
      <td>
        <strong>boolean</strong> <em>= <code>true</code></em>
        <p>
          Whether events (resize, scroll) are initially enabled.
          See more in <a href="https://popper.js.org/popper-documentation.html#Popper.Defaults.eventsEnabled">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?.positionFixed?</code></td>
      <td>
        <strong>boolean</strong> <em>= <code>false</code></em>
        <p>
          Set this to <code>true</code> if you want popper to position it self
          in "fixed" mode.
          See more in <a href="https://popper.js.org/popper-documentation.html#Popper.Defaults.positionFixed">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

**object**

The current state of the popper.
This object contains the following properties:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td><code>style</code></td>
      <td>
        <strong>object</strong>
        <p>The CSS property to apply to the popper.</p>
      </td>
    </tr>
    <tr>
      <td><code>arrowStyle</code></td>
      <td>
        <strong>object</strong>
        <p>The CSS property to apply to the popper arrow.</p>
      </td>
    </tr>
    <tr>
      <td><code>placement</code></td>
      <td>
        <strong><a href="https://popper.js.org/popper-documentation.html#Popper.placements">Placement</a> | null</strong>
        <p>Placement applied to the popper.</p>
      </td>
    </tr>
    <tr>
      <td><code>outOfBoundaries</code></td>
      <td>
        <strong>boolean</strong>
        <p>
          <code>true</code> if the reference element is out of boundaries,
          useful to know when to hide the popper.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>scheduleUpdate</code></td>
      <td>
        <strong>() => void</strong>
        <p>
          Schedules an update.
          It will run on the next UI update available.
        </p>
      </td>
    </tr>
  </tbody>
</table>
