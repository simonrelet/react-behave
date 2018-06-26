import React from 'react';
import SVGIcon from './SVGIcon';

function BaselineCheckIcon(props) {
  return (
    <SVGIcon viewBox="0 0 24 24" {...props}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </SVGIcon>
  );
}

export default BaselineCheckIcon;
