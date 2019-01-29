<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/MergeRefs/MergeRefs.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# MergeRefs

[callback-refs]: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref

Merge multiple refs on a single component.

## Usage

```jsx
import React, { Component } from 'react'
import { ComponentNeedsRef } from 'some-lib'
import { MergeRefs } from 'react-behave'

class App extends Component {
  buttonRef = React.createRef()

  componentDidMount() {
    this.buttonRef.focus()
  }

  render() {
    return (
      <ComponentNeedsRef>
        {requiredRef => (
          <MergeRefs refs={[requiredRef, this.buttonRef]}>
            {ref => <button ref={ref}>Click me</button>}
          </MergeRefs>
        )}
      </ComponentNeedsRef>
    )
  }
}
```

This component is an alternative of wrapping `<div />`s when you need to have multiple refs on a single component.

## Props

### `children`: `Function`

_Parameters_: `ref: Function`

Render the component.
`ref` is either a callback ref or `null` if `props.refs` is empty or only contain falsy values.

### `refs`: `Array`<`Function`|`Object`>

Array of refs.
Each ref can either be a [callback ref][callback-refs] or an object created with [`React.createRef`][create-ref].
Falsy refs are ignored.