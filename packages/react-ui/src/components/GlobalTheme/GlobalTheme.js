import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

const InheritedThemes = styled.div`
  background-color: ${p => p.theme.palette.background.app};
  color: ${p => p.theme.palette.text.primary};
  font-family: ${p => p.theme.typography.fontFamily};
  font-size: ${p => p.theme.typography.fontSize};
`;

class GlobalTheme extends Component {
  componentDidMount() {
    injectGlobal`
      *, *::after, *::before { box-sizing: inherit; }
      html { box-sizing: border-box; }
      body { margin: 0; }
    `;
  }

  render() {
    return <InheritedThemes>{this.props.children}</InheritedThemes>;
  }
}

GlobalTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalTheme;
