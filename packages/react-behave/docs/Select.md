# Select

Render a select component.

## Usage

```jsx
import React, { Component } from 'react';
import { Select } from 'react-behave';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapefruit', label: 'Grapefruit' },
  // ...
];

class App extends Component {
  state = {
    value: items[0],
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <Select
        items={items}
        value={this.state.value}
        onChange={this.handleChange}
        getItemLabel={item => item.label}
        getItemValue={item => item.value}
      />
    );
  }
}
```

## Props

### `getItemLabel`: `Function`

_Parameters_: `item: Any`

Invoked to get a displayable label for an item.

### `getItemValue`: `Function`

_Parameters_: `item: Any`

Invoked to get a unique identifier for an item.

### `items`: `Array`

The items to display in the drop down menu.

### `onChange`: `Function`

_Parameters_: `value: Any`

Invoked each time a value has been selected.

### `filterable`: `Boolean` (optional)

_Default value_: `false`

Whether or not to allow filtering the items.
If `true`, an input used as filter will be rendered in the dropdown using `props.renderInput`.
A filterable select will automatically open the dropdown when the user focuses the button and start typing.

### `manualProps`: `Boolean` (optional)

_Default value_: `false`

Whether or not to manually add the required props in each render function.
If `true`, each function will receive the props as the last parameter and is responsible of applying them correctly.

This is an escape hatch if you need to add props that conflicts with the required ones.
See each render function for the content of this object.

For example:

```jsx
import React, { Component } from 'react';
import { Select } from 'react-behave';

const items = [
  { value: 'apple', label: 'Apple' },
  // ...
];

const dropDownStyles = {
  backgroundColor: '#fff',
  padding: '1rem',
};

class App extends Component {
  state = {
    value: items[0],
  };

  handleChange = value => {
    this.setState({ value });
  };

  handleClick = onClick => {
    return e => {
      // Do something with the event.
      console.log(e);

      // Don't forget to call the handler (before or after).
      onClick(e);
    };
  };

  render() {
    return (
      <Select
        // Set the flag.
        manualProps
        items={items}
        value={this.state.value}
        onChange={this.handleChange}
        getItemLabel={item => item.label}
        getItemValue={item => item.value}
        renderButton={(value, open, { onClick ...props }) => (
          // Merge event handlers.
          <button {...props} onClick={this.handleClick(onClick)}>
            {value ? value.label : 'Choose an option'}
          </button>
        )}
        renderDropDown={({ style, ...props }) => (
          // Merge the computed styles with some custom ones.
          <div {...props} style={{ ...style, ...dropDownStyles }} />;
        )}
      />
    );
  }
}
```

If you need to merge refs, have a look at [`MergeRefs`](MergeRefs.md).

### `matchItem`: `Function` (optional)

_Default value_:

```jsx
function(item, filter) {
  const label = this.getItemLabel(item);
  return label.toLowerCase().includes(filter.toLowerCase());
}
```

_Parameters_: `item: Any`, `filter: String`

Invoked for each item to test whether it matches the filter.

### `renderButton`: `Function` (optional)

_Default value_:

```jsx
function(value, open, props = {}) {
  return (
    <button {...props}>
      {value ? this.getItemLabel(value) : 'Choose an option'}
    </button>
  );
}
```

_Parameters_: `value: Any`, `open: Boolean`, `[props]: Object`

Invoked to generate the render tree for the button.

`props` is defined only when [`props.manualProps`](#manualprops-boolean-optional) is `true`.
This object contains:

- `ref`
- `onClick`
- `onKeyDown`
- `onKeyPress`

### `renderDropDown`: `Function` (optional)

_Default value_:

```jsx
function(props = {}) {
  return <div {...props} />;
}
```

_Parameters_: `[props]: Object`

Invoked to generate the render tree for the dropdown.

`props` is defined only when [`props.manualProps`](#manualprops-boolean-optional) is `true`.
This object contains:

- `children`
- `data-placement`
- `ref`
- `style`

### `renderEmpty`: `Function` (optional)

_Default value_:

```jsx
function() {
  return <li>No options.</li>;
}
```

Invoked to generate the render tree for an empty item.
Only called when `props.filterable` is `true` and no items match the filter.

### `renderInput`: `Function` (optional)

_Default value_:

```jsx
function(props = {}) {
  return <input {...props} />;
}
```

_Parameters_: `[props]: Object`

Invoked to generate the render tree for an input.
Only called when `props.filterable` is `true`.

`props` is defined only when [`props.manualProps`](#manualprops-boolean-optional) is `true`.
This object contains:

- `key`
- `onKeyDown`
- `onChange`
- `ref`
- `value`

### `renderItem`: `Function` (optional)

_Default value_:

```jsx
function(item, value, highlightedItem, props = {}) {
  return <li {...props}>{this.getItemLabel(item)}</li>;
}
```

_Parameters_: `item: Any`, `value: Any`, `highlightedItem: Any`, `[props]: Object`

Invoked for each item to generate the render tree for each item.
`value` and `highlightedItem` can be used to style the item.

`props` is defined only when [`props.manualProps`](#manualprops-boolean-optional) is `true`.
This object contains:

- `key`
- `onClick`
- `onMouseEnter`
- `onMouseLeave`
- `ref`

### `renderItems`: `Function` (optional)

_Default value_:

```jsx
function(props = {}) {
  return <ul {...props} />;
}
```

_Parameters_: `[props]: Object`

Invoked to generate the render tree for the items list.

`props` is defined only when [`props.manualProps`](#manualprops-boolean-optional) is `true`.
This object contains:

- `children`
- `key`
- `onKeyDown`
- `ref`
- `tabIndex`

### `value`: `Any` (optional)

The current value.
