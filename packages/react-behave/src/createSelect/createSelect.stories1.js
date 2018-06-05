import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import createSelectList from '../createSelectList';
import createSelect from './createSelect';

const stories = storiesOf('createSelect', module);

const options = [
  { key: 'apple', label: 'Apple' },
  { key: 'blueberry', label: 'Blueberry' },
  { key: 'grapefruit', label: 'Grapefruit' },
  { key: 'melon', label: 'Melon' },
  { key: 'orange', label: 'Orange' },
  { key: 'peach', label: 'Peach' },
  { key: 'pineapple', label: 'Pineapple' },
  { key: 'raspberry', label: 'Raspberry' },
  { key: 'raspberry-papple', label: 'Raspberry papple melon' },
  { key: 'strawberry', label: 'Strawberry' },
  { key: 'watermelon', label: 'Watermelon' },
];

const HTMLSelectListView = React.forwardRef((props, ref) => {
  const {
    filterable,
    filterProps,
    dense,
    items,
    itemsProps,
    rootProps,
    style,
    ...otherProps
  } = props;

  const rootStyle = {
    ...style,
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = filterable
    ? null
    : {
        height: 0,
        maxHeight: 0,
        minHeight: 0,
        padding: 0,
        overflow: 'hidden',
        border: 0,
      };

  return (
    <div {...rootProps} ref={ref} {...otherProps} style={rootStyle}>
      <input {...filterProps} style={inputStyle} />
      <ul {...itemsProps}>
        {items.map(item => (
          <li
            {...item.rootProps}
            style={{
              fontWeight: item.selected ? 600 : 500,
              color: item.hovered ? 'blue' : 'inherit',
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
});

const HTMLSelectList = createSelectList(HTMLSelectListView);

const Button = React.forwardRef(
  ({ children, dense, open, ...otherProps }, ref) => (
    <button
      {...otherProps}
      ref={ref}
      style={{
        fontSize: dense ? '0.875em' : '1em',
        color: open ? 'blue' : 'inherit',
      }}
    >
      {children}
    </button>
  ),
);

const HTMLSelect = createSelect(Button, HTMLSelectList);

stories.add('HTML Select', () => (
  <HTMLSelect
    value={options[0].key}
    options={options}
    onChange={action('onChange')}
  />
));

stories.add('Filterable HTML Select', () => (
  <HTMLSelect
    filterable
    value={options[0].key}
    options={options}
    onChange={action('onChange')}
  />
));

stories.add('Dense filterable HTML Select', () => (
  <HTMLSelect
    dense
    filterable
    value={options[0].key}
    options={options}
    onChange={action('onChange')}
  />
));
