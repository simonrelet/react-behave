import { checkA11y } from '@storybook/addon-a11y'
import { withConsole } from '@storybook/addon-console'
import { withKnobs } from '@storybook/addon-knobs'
import { setOptions } from '@storybook/addon-options'
import { addDecorator, configure } from '@storybook/react'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import pkg from '../package.json'
import { createTheme, GlobalTheme } from '../src'

const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

addDecorator((story, context) => withConsole()(story)(context))
addDecorator(withKnobs)
addDecorator(checkA11y)
addDecorator(story => (
  <ThemeProvider theme={createTheme()}>
    <GlobalTheme>
      <Centered>{story()}</Centered>
    </GlobalTheme>
  </ThemeProvider>
))

setOptions({
  name: pkg.name,
})

configure(loadStories, module)
