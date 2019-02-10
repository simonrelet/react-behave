<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/core/getScreenSize/getScreenSize.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# getScreenSize

[props-screensizes]: Responsive.md#screensizes-object-optional

Get the screen size of a given width.

## Usage

```js
import { getScreenSize } from 'react-behave'

const screenSizes = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

const screenSize = getScreenSize(screenSizes, 800)
```

## Type signature

```js
getScreenSize(screenSizes, width): String|null
```

**Parameters**:

- `screenSizes: Object`: The screen sizes. See [`Responsive.screenSizes`][props-screensizes].
- `width: Number`: The width.

**Return** `String|null`: The screen size.
