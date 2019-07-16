# getScreenSize

Get the screen size for a given width.

## ScreenSizes

A ScreenSizes is an object for which each key is the name of a screen size and
the value is the starting width in pixels of this range.

For example:

```js
const SCREEN_SIZES = {
  sm: 0,
  md: 960,
  lg: 1280,
}

// The order of the keys is not important.
// Still works but harder to read.
const SCREEN_SIZES_SHUFFLED = {
  lg: 1280,
  sm: 0,
  md: 960,
}
```

Define the following screen sizes:

- `'sm'`: [0, 960[
- `'md'`: [960, 1280[
- `'lg'`: [1280, ∞[

## Usage

```js
import React from 'react'
import { getScreenSize } from 'react-behave'

const SCREEN_SIZES = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

function App() {
  // window.innerWidth === 800
  const screenSize = getScreenSize(SCREEN_SIZES, window.innerWidth)

  // screenSize === 'sm'
  console.log(screenSize)

  return <div />
}
```

### Responsive components

`getScreenSize` can also be used to have responsive components.
See [`watchResize`](watchResize.md).

```js
import React from 'react'
import { getScreenSize, watchResize } from 'react-behave'

const SCREEN_SIZES = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

function FancyLayout() {
  const element = React.useRef(null)
  const [size, setSize] = React.useState(null)

  React.useEffect(() => {
    return watchResize(element.current, ({ width }) => {
      setSize(getScreenSize(SCREEN_SIZES, width))
    })
  }, [])

  return <div ref={element} />
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
      <td><code>screenSizes</code></td>
      <td>
        <strong>ScreenSizes</strong>
        <p>
          The screen sizes.
          See <a href="#screensizes">ScreenSizes</a>.
        </p>
      </td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>
        <strong>number</strong>
        <p>The width in pixels.</p>
      </td>
    </tr>
  </tbody>
</table>

## Return value

**string | null**

The matching screen size.
