# usePopper

A React hook around [Popper.js](https://popper.js.org).

## Usage

```js
import React from 'react'
import { usePopper } from 'react-behave'

function DropdownButton() {
  const referenceRef = React.useRef(null)
  const popperRef = React.useRef(null)
  const [opened, setOpened] = React.useState(false)
  const { style } = usePopper(referenceRef, popperRef, { disabled: !opened })

  return (
    <>
      <button ref={referenceRef} onClick={() => setOpened(opened => !opened)}>
        Open dropdown
      </button>

      {opened && (
        <div ref={popperRef} style={style}>
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
      <td><code>referenceRef</code></td>
      <td>
        <strong>MutableRefObject&lt;HTMLElement | <a href="https://popper.js.org/popper-documentation.html#referenceObject">ReferenceObject</a> | null&gt;</strong>
        <p>
          Ref object of the reference element used to position the popper.
          See more in <a href="https://popper.js.org/popper-documentation.html#new_Popper_new">Popper.js's documentation</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>popperRef</code></td>
      <td>
        <strong>MutableRefObject&lt;HTMLElement | null&gt;</strong>
        <p>
          Ref object of the HTML element used as the popper.
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
      <td><code>options?.disabled?</code></td>
      <td>
        <strong>boolean</strong> <em>= <code>false</code></em>
        <p>
          Whether the entire hook should be disabled or not.
          You can set this option to <code>true</code> if you need to "delay" the positionning until elements are ready.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>options?.arrowRef?</code></td>
      <td>
        <strong>MutableRefObject&lt;string | HTMLElement | null&gt;</strong>
        <p>
          Ref object of the selector or node used as arrow.
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
        <strong><a href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration">CSSStyleDeclaration</a></strong>
        <p>The CSS property to apply to the popper.</p>
      </td>
    </tr>
    <tr>
      <td><code>arrowStyle</code></td>
      <td>
        <strong><a href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration">CSSStyleDeclaration</a></strong>
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
