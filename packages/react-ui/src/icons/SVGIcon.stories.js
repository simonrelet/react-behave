import { storiesOf } from '@storybook/react';
import React from 'react';
import { getDisplayName } from 'react-behave';
import injectStyles from '../core/injectStyles';
import allIcons from './allIcons';

const stories = storiesOf('Icons', module);

function gridStyles({ spacing }) {
  return {
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gridAutoRows: 'auto',
      gridGap: spacing(2),
      padding: spacing(2),
      width: '100%',
    },
  };
}

const Grid = injectStyles(gridStyles)(({ children, classes }) => (
  <div className={classes.root}>{children}</div>
));

function iconDemonStyles({ spacing }) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      height: '3rem',
    },
    iconName: {
      fontSize: '0.75rem',
      marginTop: spacing(),
    },
  };
}

const IconDemo = injectStyles(iconDemonStyles)(({ classes, icon: Icon }) => (
  <div className={classes.root}>
    <Icon className={classes.icon} />
    <code className={classes.iconName}>{getDisplayName(Icon)}</code>
  </div>
));

stories.add('All icons', () => (
  <Grid>
    {allIcons.map(icon => <IconDemo key={icon.name} icon={icon.component} />)}
  </Grid>
));
