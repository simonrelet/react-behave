import { action } from '@storybook/addon-actions';
import { boolean, button } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { Component } from 'react';
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

class WithState extends Component {
  static defaultProps = {
    initialState: {},
  };

  state = this.props.initialState;

  render() {
    return this.props.children(this.state, state => this.setState(state));
  }
}

function SelectStory(props) {
  return (
    <WithState initialState={{ value: null }}>
      {(state, setState) => {
        button('Reset value', () => setState({ value: null }));
        return props.children(state, setState);
      }}
    </WithState>
  );
}

stories.add('Default renderers', () => (
  <SelectStory>
    {(state, setState) => (
      <Select
        filterable={boolean('Filterable', false)}
        getItemLabel={item => item.label}
        getItemValue={item => item.key}
        onChange={value => {
          action('onChange')(value);
          setState({ value });
        }}
        items={items}
        value={state.value}
      />
    )}
  </SelectStory>
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
  <SelectStory>
    {(state, setState) => (
      <Select
        manualProps
        filterable={boolean('Filterable', false)}
        getItemLabel={item => item.label}
        getItemValue={item => item.key}
        onChange={value => {
          action('onChange')(value);
          setState({ value });
        }}
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
        value={state.value}
      />
    )}
  </SelectStory>
));

stories.add('Dropdown positions', () => (
  <div
    style={{
      width: '200vw',
      height: '200vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <SelectStory>
      {(state, setState) => (
        <Select
          filterable={boolean('Filterable', false)}
          getItemLabel={item => item.label}
          getItemValue={item => item.key}
          onChange={value => {
            action('onChange')(value);
            setState({ value });
          }}
          items={items}
          value={state.value}
        />
      )}
    </SelectStory>
  </div>
));
