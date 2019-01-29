<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/Responsive/Responsive.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# Responsive

[props-minimum]: #minimum-string-optional
[props-maximum]: #maximum-string-optional
[props-screensizes]: #screensizes-object-optional

Render content depending on the screen size.

## Usage

```jsx
import React, { Component } from 'react'
import { Responsive } from 'react-behave'

const screenSizes = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

class App extends Component {
  render() {
    return (
      <Responsive minimum="md" screenSizes={screenSizes}>
        <p>Only visible on medium and bigger screens</p>
      </Responsive>
    )
  }
}
```

## Props

### `children`: `Function`|`Node`

_Parameters_: `screenSize: String`, `width: Number`

Invoked to render the children.

The children will only be rendered if the current width is satisfied by [`props.maximum`][props-maximum] and [`props.minimum`][props-minimum].

Example:

```jsx
import React from 'react'
import { Responsive } from 'react-behave'

const screenSizes = {
  // [...]
}

function LargeScreen() {
  return (
    <Responsive minimum="lg" screenSizes={screenSizes}>
      {screenSize => <p>The screen size is '{screenSize}'</p>}
    </Responsive>
  )
}
```

For convenience, `props.children` can also be a React element.
See [Usage](#usage).

### `maximum`: `String` (optional)

Maximum screen width.
Must be one of the keys of [`props.screenSizes`][props-screensizes].

### `minimum`: `String` (optional)

Minimum screen width.
Must be one of the keys of [`props.screenSizes`][props-screensizes].

### `resizeInterval`: `Number` (optional)

_Default value_: `166`

The minimum interval between two resizes.

### `screenSizes`: `Object` (optional)

_Default value_:

```jsx
{
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}
```

The screen sizes to use.
Each key is the name of a screen size that will be used by [`props.maximum`][props-maximum] and [`props.minimum`][props-minimum], and the value is the starting width in pixels of this range.

For example:

```js
const screenSizes = {
  sm: 0,
  md: 960,
  lg: 1280,
}
```

Define the following screen sizes:

- `'sm'`: [0, 960[
- `'md'`: [960, 1280[
- `'lg'`: [1280, ∞[
