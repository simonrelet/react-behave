# getDisplayName

Get the display name of a component.

## Usage

```js
import { getDisplayName } from 'react-behave';
import MyComponent from './MyComponent';

const displayName = getDisplayName(MyComponent);
```

## Type signature

```js
getDisplayName(component): string
```

**Parameters**:

- `component: React.Component`: The React component.

**Return** `string`: The component's name.
