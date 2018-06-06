# getDisplayName(component) ⇒ `string`

Get the display name of a component.

## Usage

```js
import { getDisplayName } from '@simonrelet/react-utils';
import MyComponent from './MyComponent';

const displayName = getDisplayName(MyComponent);
```

**Returns**: `string` - The component's name.

| Param       | Type              | Description          |
| ----------- | ----------------- | -------------------- |
| `component` | `React.Component` | The React component. |
