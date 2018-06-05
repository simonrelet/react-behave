# Responsivity

> Create a component managing responsivity.

## Usage

```jsx
import { createResponsivity } from 'react-behave';
import React, { Component } from 'react';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const Responsive = createResponsivity(breakpoints);

class App extends Component {
  render() {
    return (
      <Responsive up="md">
        <p>Only visible on medium and bigger screens</p>
      </Responsive>
    );
  }
}
```

## Breakpoints

The breakpoints are defined in an object.
Each key is the name of a screen size range that will be used by the [component props](#responsive) and the value is the starting width in pixels of this range.

For example:

```js
const breakpoints = {
  sm: 0,
  md: 960,
  lg: 1280,
};
```

Define the following screen sizes ranges:

- `sm`: [0, 960[
- `md`: [960, 1280[
- `lg`: [1280, ∞[

## API

### createResponsivity(breakpoints) => [Responsive](#responsive)

Higher Order Component creating a [Responsive](#responsive) component.

| Parameter     | Type     | Default value | Description                                          |
| ------------- | -------- | ------------- | ---------------------------------------------------- |
| `breakpoints` | `Object` |               | Breakpoints to use. [See Breakpoints](#breakpoints). |

### Responsive

React component returned by [`createResponsivity()`](#createresponsivitybreakpoints--responsive).

Depending on the current screen size, this component will render or not its content.

Three methods of passing the content exists:

1.  `<Responsive children />`

```jsx
function App() {
  return (
    <Responsive>
      <p>Hello</p>
    </Responsive>
  );
}
```

2.  `<Responsive component />`

```jsx
function App() {
  return <Responsive component={MyComponent} />;
}
```

3.  `<Responsive render />`

```jsx
function App() {
  return <Responsive render={() => <p>Hello</p>} />;
}
```

Both the component and the render function will receive a `width` props containing the current screen size name.

#### Component props

| Name        | Type                                  | Default value | Description           |
| ----------- | ------------------------------------- | ------------- | --------------------- |
| `children`  | `node`                                |               | Node to render.       |
| `component` | `object`                              |               | Component to render.  |
| `down`      | `string`, one of the breakpoints keys |               | Maximum screen width. |
| `render`    | `function`                            |               | Rendering function.   |
| `up`        | `string`, one of the breakpoints keys |               | Minimum screen width. |
