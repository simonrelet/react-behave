import { action } from '@storybook/addon-actions';
import { boolean, button, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { Component } from 'react';
import { color } from '../../../storybook/knobs';
import Select from './Select';

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

  render() {
    return this.props.children(this.state, state => this.setState(state));
  }
}

const generalGroup = 'general';
const labelGroup = 'label';

function SelectStory(props) {
  return (
    <WithState initialState={{ value: null }}>
      {(state, setState) => {
        button('Reset value', () => setState({ value: null }), generalGroup);
        return props.children(state, setState);
      }}
    </WithState>
  );
}

stories.add('Dynamic select', () => (
  <SelectStory>
    {(state, setState) => (
      <Select
        dense={boolean('Dense', false, generalGroup)}
        emptyLabel={text('Empty label', '', labelGroup) || undefined}
        filterable={boolean('Filterable', false, generalGroup)}
        getItemLabel={item => item.label}
        getItemValue={item => item.value}
        inputPlaceHolder={
          text('Input placeholder', '', labelGroup) || undefined
        }
        items={items}
        label={text('Label', '', labelGroup) || undefined}
        nullLabel={text('Null label', '', labelGroup) || undefined}
        onChange={value => {
          action('onChange')(value);
          setState({ value });
        }}
        color={color('Color', '', generalGroup)}
        value={state.value}
      />
    )}
  </SelectStory>
));
