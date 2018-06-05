# MergeRefs

[callback-refs]: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
[create-ref]: https://reactjs.org/docs/react-api.html#reactcreateref

> Merge multiple refs on a single HTML element.

## Usage

```jsx
import React, { Component } from 'react';
import { ComponentNeedRef } from 'some-lib';
import { MergeRefs } from 'react-behave';

class App extends Component {
  buttonRef = React.createRef();

  componentDidMount() {
    this.buttonRef.focus();
  }

  render() {
    return (
      <ComponentNeedRef
        render={requiredRef => (
          <MergeRefs
            refs={[requiredRef, this.buttonRef]}
            render={ref => <button ref={ref}>Click me</button>}
          />
        )}
      />
    );
  }
}
```

This component is an alternative of wrapping `<div />`s when you need to have multiple refs on a single HTML element.

## Props

_Mandatory props are marked with a `*`._

| Name                                   |            Type             | Default value | Description                                                                                                                                              |
| -------------------------------------- | :-------------------------: | :-----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <strong><code>refs</code>\*</strong>   | `arrayOf`<`func`\|`object`> |               | Array of refs. Each ref can either be a [callback ref][callback-refs] or an object created with [`React.createRef`][create-ref]. Falsy refs are ignored. |
| <strong><code>render</code>\*</strong> |           `func`            |               | Render function. The parameter is either a callback ref or `null` if `refs` is empty or only contain falsy values.                                       |
