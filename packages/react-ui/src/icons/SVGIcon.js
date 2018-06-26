import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  display: inline-block;
  fill: currentColor;
  flex: none;
  height: 1.5em;
  userselect: none;
`;

function SVGIcon({ children, viewBox, ...otherProps }) {
  return (
    <SVG viewBox={viewBox} {...otherProps}>
      {children}
    </SVG>
  );
}

SVGIcon.propTypes = {
  children: PropTypes.node.isRequired,
  viewBox: PropTypes.string.isRequired,
};

export default SVGIcon;
