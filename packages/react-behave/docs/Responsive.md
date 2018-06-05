# Responsive

> Render content depending on the screen size.

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

## Screen sizes

The screen sizes are defined in an object.
Each key is the name of a screen size that will be used by `maximum` and `minimum` props and the value is the starting width in pixels of this range.

For example:

```js
const screenSizes = {
  sm: 0,
  md: 960,
  lg: 1280,
};
```

Define the following screen sizes:

- `sm`: [0, 960[
- `md`: [960, 1280[
- `lg`: [1280, ∞[

## Render methods

### `<Responsive children />`

The children will only be rendered if the current width is satisfied by `maximum` and `minimum`.

See the [Usage](#usage) for an example.

### `<Responsive render />`

The render function will only be called if the current width is satisfied by `maximum` and `minimum`.
This function takes the width as first parameter.

Warning: `<Responsive children />` takes precedence over `<Responsive render />` so don’t use both.

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

## Props

_Mandatory props are marked with a `*`._

| Name                                        |   Type   | Default value | Description                                                          |
| ------------------------------------------- | :------: | :-----------: | -------------------------------------------------------------------- |
| `children`                                  |  `node`  |               | Children to render. See the [render methods](#responsive-children-). |
| `maximum`                                   | `string` |               | Maximum screen width. Must be one of the `screenSizes`.              |
| `minimum`                                   | `string` |               | Minimum screen width. Must be one of the `screenSizes`.              |
| `render`                                    |  `func`  |               | Render function. See the [render methods](#responsive-render-).      |
| <strong><code>screenSizes</code>\*</strong> | `object` |               | Screen sizes to use. See [Screen sizes](#screen-sizes).              |
