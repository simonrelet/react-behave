# Responsive

Render content depending on the screen size.

## Usage

```jsx
import React, { Component } from 'react';
import { Responsive } from 'react-behave';

const screenSizes = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

class App extends Component {
  render() {
    return (
      <Responsive minimum="md" screenSizes={screenSizes}>
        <p>Only visible on medium and bigger screens</p>
      </Responsive>
    );
  }
}
```

## Props

### `children`: `Node` (optional)

Children to render.
The children will only be rendered if the current width is satisfied by `props.maximum` and `props.minimum`.
See the [Usage](#usage) for an example.

### `maximum`: `String` (optional)

Maximum screen width.
Must be one of the keys of `props.screenSizes`.

### `minimum`: `String` (optional)

Minimum screen width.
Must be one of the keys of `props.screenSizes`.

### `render`: `Function` (optional)

_Parameters_: `width: String`

Render the content.
This function will only be called if the current width is satisfied by `props.maximum` and `props.minimum`.

Warning: The `props.children` takes precedence over `props.render` so don’t use both.

Example:

```jsx
const screenSizes = {
  // [...]
};

function LargeScreen() {
  return (
    <Responsive
      minimum="lg"
      screenSizes={screenSizes}
      render={width => <p>The width is '{width}'</p>}
    />
  );
}
```

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
Each key is the name of a screen size that will be used by `props.maximum` and `props.minimum` props and the value is the starting width in pixels of this range.

For example:

```js
const screenSizes = {
  sm: 0,
  md: 960,
  lg: 1280,
};
```

Define the following screen sizes:

- `'sm'`: [0, 960[
- `'md'`: [960, 1280[
- `'lg'`: [1280, ∞[
