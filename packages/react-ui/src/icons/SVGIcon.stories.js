import { storiesOf } from '@storybook/react'
import React from 'react'
import { getDisplayName } from 'react-behave'
import styled from 'styled-components'
import allIcons from './allIcons'

const stories = storiesOf('Icons', module)

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
  padding: 1rem;
  width: 100%;
`

const IconDemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconDemoName = styled.code`
  font-size: 0.75rem;
  margin-top: 0.5rem;
`

function IconDemo({ icon }) {
  const Icon = styled(icon)`
    height: 3rem;
  `

  return (
    <IconDemoWrapper>
      <Icon />
      <IconDemoName>{getDisplayName(icon)}</IconDemoName>
    </IconDemoWrapper>
  )
}

stories.add('All icons', () => (
  <Grid>
    {allIcons.map(icon => <IconDemo key={icon.name} icon={icon.component} />)}
  </Grid>
))
