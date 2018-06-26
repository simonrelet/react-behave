import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Select from './Select';

const stories = storiesOf('Select', module);

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

const selectOptions = options.reduce(
  (acc, option) => ({ ...acc, [option.key]: option.label }),
  {},
);

stories.add('Dynamic', () => (
  <Select
    filterable={boolean('Filterable', false)}
    value={select('Value', selectOptions, options[0].key)}
    options={options}
    onChange={action('onChange')}
  />
));
