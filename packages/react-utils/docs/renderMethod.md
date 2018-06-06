# renderMethod(methods, [props]) ⇒ `React.Element`

Helper function to support multiple render methods.

## Usage

```jsx
import React, { Component } from 'react';
import { renderMethod } from '@simonrelet/react-utils';

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

| Param                 | Type              | Default | Description                                                                    |
| --------------------- | ----------------- | ------- | ------------------------------------------------------------------------------ |
| `methods`             | `Object`          |         | The render methods. At least one of the methods must be provided.              |
| `[methods.children]`  | `React.Node`      |         | The children of the component. See the [render methods](#render-methods).      |
| `[methods.component]` | `React.Component` |         | A React component. See the [render methods](#render-methods).                  |
| `[methods.render]`    | `function`        |         | A render function. See the [render methods](#render-methods).                  |
| `[props]`             | `Object`          | `{}`    | The props to pass down. Only passed with the `component` and `render` methods. |
