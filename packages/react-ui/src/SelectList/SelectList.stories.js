import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import SelectList from './SelectList';

const stories = storiesOf('SelectList', module);

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

const selectOptions = items.reduce(
  (acc, option) => ({ ...acc, [option.key]: option.label }),
  {},
);

stories.add('Dynamic', () => (
  <SelectList
    filterable={boolean('Filterable', false)}
    value={select('Value', selectOptions, items[0].key)}
    items={items}
    onChange={action('onChange')}
  />
));
