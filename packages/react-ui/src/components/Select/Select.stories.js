import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { Component } from 'react';
import Select, { severities } from './Select';

const stories = storiesOf('Select', module);

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapefruit', label: 'Grapefruit' },
  { value: 'melon', label: 'Melon' },
  { value: 'orange', label: 'Orange' },
  { value: 'peach', label: 'Peach' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'raspberry-papple', label: 'Raspberry papple melon' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'watermelon', label: 'Watermelon' },
];

class WithState extends Component {
  static defaultProps = {
    initialState: {},
  };

  state = this.props.initialState;

  handleSetState = state => {
    this.setState(state);
  };

  render() {
    return this.props.children(this.state, this.handleSetState);
  }
}

stories.add('Dynamic select', () => (
  <WithState initialState={{ value: null }}>
    {(state, setState) => (
      <Select
        filterable={boolean('Filterable', false)}
        items={items}
        value={state.value}
        getItemLabel={item => item.label}
        getItemValue={item => item.value}
        severity={select('Severity', severities, severities[0])}
        onChange={value => {
          action('onChange')(value);
          setState({ value });
        }}
      />
    )}
  </WithState>
));
