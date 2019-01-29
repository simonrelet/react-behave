import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { Manager, Popper, Reference } from 'react-popper'
import minWidthModifier from './minWidthModifier'

const stories = storiesOf('minWidthModifier', module)

class App extends React.Component {
  state = { open: false }

  toggleDropdown = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  render() {
    const { open } = this.state

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <button ref={ref} onClick={this.toggleDropdown}>
              {text('Button text', 'Click on me to open the popper')}
            </button>
          )}
        </Reference>

        {open && (
          <Popper placement="bottom-start" modifiers={{ minWidthModifier }}>
            {({ ref, style }) => (
              <div ref={ref} style={{ ...style, backgroundColor: '#ccc' }}>
                {text('Popper text', 'Popper element')}
              </div>
            )}
          </Popper>
        )}
      </Manager>
    )
  }
}

stories.add('Apply min width if needed', () => <App />)
