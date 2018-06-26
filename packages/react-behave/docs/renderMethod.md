# renderMethod

Helper function to support multiple render methods.

## Usage

```jsx
import React, { Component } from 'react';
import { renderMethod } from 'react-behave';

class WithUser extends Component {
  render() {
    // Get the user somehow.
    const { user } = this.state;
    const { component, render } = this.props;

    return user ? renderMethod({ component, render }, user) : null;
  }
}

const UserName = () => <WithUser render={user => <h1>{user.name}</h1>} />;

// If `user.email` exists:
const Email = ({ email }) => <span>{email}</span>;
const UserEmail = () => <WithUser component={Email} />;
```

## Render methods

The first render method defined is used:

- `children`: Render the children unchanged (the `props` are not passed down).
- `component`: Render the component with the given `props`.
- `render`: Call the render function with the `props` as first parameter.

## Type signature

```js
renderMethod(methods, [props]): React.Element
```

**Parameters**:

- `methods: Object`: The render methods. At least one of the methods must be provided. See the [render methods](#render-methods).
  - `[.children]: React.Node`: The children of the component.
  - `[.component]: React.Component`: A React component.
  - `[.render]: function`: A render function.
- `[props]: Object`: The props to pass down. Only passed to the `component` and `render` methods.

**Return** `React.Element`: The render tree.
