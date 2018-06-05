import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import createSelectList from './createSelectList';

const stories = storiesOf('createSelectList', module);

const items = [
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

function HTMLSelectListView({
  filterable,
  filterProps,
  dense,
  items,
  itemsProps,
  rootProps,
  ...otherProps
}) {
  return (
    <div {...rootProps} {...otherProps}>
      <input {...filterProps} />
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
}

const HTMLSelectList = createSelectList(HTMLSelectListView);

stories.add('HTML Select list', () => (
  <HTMLSelectList
    filterable
    value={items[0].key}
    items={items}
    onChange={action('onChange')}
  />
));
