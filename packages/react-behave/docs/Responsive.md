# Responsive

> Create a component managing responsivity.

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
    <Responsive up="md" screenSizes={screenSizes}>
      <p>Only visible on medium and bigger screens</p>
    </Responsive>;
  }
}
```

## Screen sizes

The screen sizes are defined in an object.
Each key is the name of a screen size that will be used by `down` and `up` props and the value is the starting width in pixels of this range.

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

## Props

| Name          | Type     | Default value | Description                                                                            |
| ------------- | -------- | ------------- | -------------------------------------------------------------------------------------- |
| `children`    | `node`   |               | Children to render if the current width is satisfied by `down` and `up`.               |
| `down`        | `string` |               | Maximum screen width. Must be one of the `screenSizes`.                                |
| `render`      | `func`   |               | Render function. Warning: `children` takes precedence over `render` so don’t use both. |
| `screenSizes` | `object` |               | Screen sizes to use. See [Screen sizes](#screen-sizes)                                 |
| `up`          | `string` |               | Minimum screen width. Must be one of the `screenSizes`.                                |
