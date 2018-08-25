<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/core/toInnerRef.js instead.
  If you still need to make changes in this file, remove this header so it won't be overridden.
-->

# toInnerRef

[fr]: https://reactjs.org/docs/react-api.html#reactforwardref

Higher order component renaming the prop `ref` to `innerRef`.

This HOC can be seen as an abstraction over the [`React.forwardRef`][fr] API.

## Usage

```jsx
import React from 'react'
import { toInnerRef } from 'react-behave'

const MyComponent = ({ innerRef, ...props }) => (
  <div ref={innerRef} {...props} />
)

// Instead of:
// export default React.forwardRef((props, ref) => (
//   <MyComponent innerRef={ref} {...props} />
// ));

// Simply write:
export default toInnerRef(MyComponent)
```

## Type signature

```js
toInnerRef(Component): React.Component
```

**Parameters**:

- `Component: React.Component`: The React component.

**Return** `React.Component`: The wrapping component.
