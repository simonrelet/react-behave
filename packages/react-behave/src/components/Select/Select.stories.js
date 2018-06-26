import { action } from '@storybook/addon-actions';
import { boolean, selectV2 } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Select from './Select';

const stories = storiesOf('Select', module);

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

const values = items.reduce((acc, item) => [...acc, item.label], ['None']);

stories.add('Default renderers', () => (
  <Select
    filterable={boolean('Filterable', false)}
    getItemLabel={item => item.label}
    getItemValue={item => item.key}
    onChange={action('onChange')}
    items={items}
    value={items[items.length - 1]}
  />
));

function getButtonStyle(open) {
  const defaultStyle = {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: 'transparent',
    padding: '0.5rem 1rem',
    border: '1px solid',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return {
    ...defaultStyle,
    borderColor: open ? '#2196f3' : '#ccc',
    color: open ? '#2196f3' : 'inherit',
  };
}

const defaultItemStyle = {
  padding: '0.5rem 1rem',
};

function getItemStyle(item, value, highlighted) {
  const isValue = value && item.key === value.key;
  const isHighlighted = highlighted && item.key === highlighted.key;

  return {
    ...defaultItemStyle,
    cursor: 'pointer',
    fontWeight: isValue ? 600 : 500,
    backgroundColor: isHighlighted ? '#2196f3' : 'transparent',
    color: isHighlighted ? '#fff' : 'inherit',
  };
}

const dropDownStyle = {
  zIndex: 1300,
  backgroundColor: '#fff',
  maxHeight: 274,
  border: '1px solid #ccc',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
};

const itemsStyle = {
  listStyle: 'none',
  overflow: 'auto',
  padding: 0,
  margin: 0,
  flex: 1,
};

const inputStyle = {
  flex: 'none',
  padding: '0.5rem 1rem',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  border: 'none',
};

stories.add('Custom renders', () => (
  <Select
    manualProps
    filterable={boolean('Filterable', false)}
    getItemLabel={item => item.label}
    getItemValue={item => item.key}
    onChange={action('onChange')}
    items={items}
    renderButton={(value, open, props) => (
      <button {...props} style={getButtonStyle(open)}>
        {value ? value.label : 'Choose an option'}
      </button>
    )}
    renderDropDown={({ style, ...props }) => (
      <div {...props} style={{ ...style, ...dropDownStyle }} />
    )}
    renderEmpty={() => <li style={defaultItemStyle}>No options.</li>}
    renderInput={props => (
      <input {...props} style={inputStyle} placeholder="Filter" />
    )}
    renderItem={(item, value, highlighted, props) => (
      <li {...props} style={getItemStyle(item, value, highlighted)}>
        {item.label}
      </li>
    )}
    renderItems={props => <ul {...props} style={itemsStyle} />}
    value={items[items.length - 1]}
  />
));

stories.add('Dropdown positions', () => {
  const select = selectV2('Value', values, values[0]);

  return (
    <div
      style={{
        width: '200vw',
        height: '200vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Select
        filterable={boolean('Filterable', false)}
        getItemLabel={item => item.label}
        getItemValue={item => item.key}
        onChange={action('onChange')}
        items={items}
        value={items.find(item => item.label === select)}
      />
    </div>
  );
});
