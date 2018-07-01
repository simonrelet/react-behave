<!--
  THIS FILE WAS GENERATED!
  Don't make any changes in it, update src/components/Select/Select.js instead.
-->

# Select

[props-multiple]: #multiple-boolean-optional
[props-value]: #value-anyarray-optional
[props-getitemvalue]: #getitemvalue-function
[props-getitemlabel]: #getitemlabel-function
[props-manualprops]: #manualprops-boolean-optional

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
function(item, filter, { getItemLabel }) {
  const label = getItemLabel(item);
  return label.toLowerCase().includes(filter.toLowerCase());
}
```

_Parameters_: `item: Any`, `filter: String`, `context: Object`

Invoked for each item to test whether it matches the filter.

The `context` object contains:

- `getItemLabel: Function`: See [`props.getItemLabel`][props-getitemlabel].
- `getItemValue: Function`: See [`props.getItemValue`][props-getitemvalue].

### `multiple`: `Boolean` (optional)

_Default value_: `false`

Whether or not to allow multiple values.
If `true` then [`props.value`][props-value] is required and must be an `Array`.

### `renderButton`: `Function` (optional)

_Default value_:

```jsx
function({ getItemLabel, value }, props = {}) {
  return (
    <button {...props}>
      {value ? getItemLabel(value) : 'Choose an option'}
    </button>
  );
}
```

_Parameters_: `context: Object`, `[props]: Object`

Invoked to generate the render tree for the button.

The `context` object contains:

- `getItemLabel: Function`: See [`props.getItemLabel`][props-getitemlabel].
- `getItemValue: Function`: See [`props.getItemValue`][props-getitemvalue].
- `multiple: Boolean`: See [`props.multiple`][props-multiple].
- `open: Boolean`: Whether the dropdown is openned or not.
- `value: Any|Array`: See [`props.value`][props-value].

`props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
This object contains:

- 'aria-expanded'
- 'aria-haspopup'
- `onClick`
- `onKeyDown`
- `onKeyPress`
- `ref`

### `renderDropDown`: `Function` (optional)

_Default value_:

```jsx
function(props = {}) {
  return <div {...props} />;
}
```

_Parameters_: `[props]: Object`

Invoked to generate the render tree for the dropdown.

`props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
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

`props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
This object contains:

- `key`
- `onKeyDown`
- `onChange`
- `ref`
- `value`

### `renderItem`: `Function` (optional)

_Default value_:

```jsx
function({ getItemLabel, item }, props = {}) {
  return <li {...props}>{getItemLabel(item)}</li>;
}
```

_Parameters_: `context: Object`, `[props]: Object`

Invoked for each item to generate the render tree for each item.

The `context` object contains:

- `getItemLabel: Function`: See [`props.getItemLabel`][props-getitemlabel].
- `getItemValue: Function`: See [`props.getItemValue`][props-getitemvalue].
- `isHighlighted: Boolean`: Whether the item is being highlighted or not.
- `isValue: Boolean`: Whether the item is a value or not.
- `item: Any`: The item to render.

`props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
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

`props` is defined only when [`props.manualProps`][props-manualprops] is `true`.
This object contains:

- `children`
- `key`
- `onKeyDown`
- `ref`
- `role`
- `tabIndex`

### `value`: `Any`|`Array` (optional)

The current value(s).
If [`props.multiple`][props-multiple] is `true`, then `props.value` must be an `Array`.
