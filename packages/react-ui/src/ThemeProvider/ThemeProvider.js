import { create as createJss } from 'jss';
import jssPreset from 'jss-preset-default';
import PropTypes from 'prop-types';
import React from 'react';
import { JssProvider, ThemeProvider as Provider } from 'react-jss';

const jss = createJss(jssPreset());

const ThemeProvider = props => {
  const { children, theme } = props;
  return (
    <JssProvider jss={jss}>
      <Provider theme={theme}>{children}</Provider>
    </JssProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ThemeProvider;
