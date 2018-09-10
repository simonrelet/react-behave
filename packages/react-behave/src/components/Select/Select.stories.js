import { action } from '@storybook/addon-actions'
import { boolean, button } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { WithState } from '../../../.storybook/components'
import Select from './Select'

const stories = storiesOf('Select', module)

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
]

function SelectStory({ children, initialValue = null }) {
  return (
    <WithState initialState={{ value: initialValue }}>
      {(state, setState) => {
        button('Reset value', () => setState({ value: initialValue }))
        return children(state, setState)
      }}
    </WithState>
  )
}

stories.add('Default renderers', () => (
  <SelectStory>
    {(state, setState) => (
      <Select
        filterable={boolean('Filterable', false)}
        getItemLabel={item => item.label}
        getItemValue={item => item.key}
        onChange={value => {
          action('onChange')(value)
          setState({ value })
        }}
        items={items}
        value={state.value}
      />
    )}
  </SelectStory>
))

function getButtonStyle(open) {
  const defaultStyle = {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: 'transparent',
    padding: '0.5rem 1rem',
    border: '1px solid',
    borderRadius: '3px',
    cursor: 'pointer',
  }

  return {
    ...defaultStyle,
    borderColor: open ? '#2196f3' : '#ccc',
    color: open ? '#2196f3' : 'inherit',
  }
}

const defaultItemStyle = {
  padding: '0.5rem 1rem',
}

function getItemStyle(isValue, isHighlighted) {
  return {
    ...defaultItemStyle,
    cursor: 'pointer',
    fontWeight: isValue ? 600 : 500,
    backgroundColor: isHighlighted ? '#2196f3' : 'transparent',
    color: isHighlighted ? '#fff' : 'inherit',
  }
}

const dropDownStyle = {
  zIndex: 1300,
  backgroundColor: '#fff',
  maxHeight: 274,
  border: '1px solid #ccc',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
}

const itemsStyle = {
  listStyle: 'none',
  overflow: 'auto',
  padding: 0,
  margin: 0,
  flex: 1,
}

const inputStyle = {
  flex: 'none',
  padding: '0.5rem 1rem',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  border: 'none',
}

function StyledSelect(props) {
  return (
    <Select
      manualProps
      renderButton={({ value, open, multiple, getItemLabel }, props) => (
        <button {...props} style={getButtonStyle(open)}>
          {multiple
            ? value.length
              ? value.map(getItemLabel).join(', ')
              : 'Choose options'
            : value
              ? getItemLabel(value)
              : 'Choose an option'}
        </button>
      )}
      renderDropdown={({ style, ...props }) => (
        <div {...props} style={{ ...style, ...dropDownStyle }} />
      )}
      renderEmpty={() => <li style={defaultItemStyle}>No options.</li>}
      renderInput={props => (
        <input {...props} style={inputStyle} placeholder="Filter" />
      )}
      renderItem={({ item, isValue, isHighlighted, getItemLabel }, props) => (
        <li {...props} style={getItemStyle(isValue, isHighlighted)}>
          {getItemLabel(item)}
        </li>
      )}
      renderItems={props => <ul {...props} style={itemsStyle} />}
      {...props}
    />
  )
}

stories.add('Custom renders', () => (
  <SelectStory>
    {(state, setState) => (
      <StyledSelect
        filterable={boolean('Filterable', false)}
        getItemLabel={item => item.label}
        getItemValue={item => item.key}
        onChange={value => {
          action('onChange')(value)
          setState({ value })
        }}
        items={items}
        value={state.value}
      />
    )}
  </SelectStory>
))

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
            action('onChange')(value)
            setState({ value })
          }}
          items={items}
          value={state.value}
        />
      )}
    </SelectStory>
  </div>
))

stories.add('Multiple selection', () => (
  <SelectStory initialValue={[]}>
    {(state, setState) => (
      <StyledSelect
        multiple
        filterable={boolean('Filterable', false)}
        getItemLabel={item => item.label}
        getItemValue={item => item.key}
        onChange={value => {
          action('onChange')(value)
          setState({ value })
        }}
        items={items}
        value={state.value}
      />
    )}
  </SelectStory>
))
