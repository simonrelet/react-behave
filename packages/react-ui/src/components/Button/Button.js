import {
  darken,
  getLuminance,
  lighten,
  readableColor,
  transparentize,
} from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

function emphasize(color) {
  return getLuminance(color) > 0.5 ? darken(0.15, color) : lighten(0.15, color)
}

const defaultColor = 'white'

const attrs = {
  color: p => p.theme.palette[p.color || defaultColor],

  padding: p => [
    p.theme.relativeSpacing(),
    p.theme.relativeSpacing(p.withIconRight ? 1 : 2),
    p.theme.relativeSpacing(),
    p.theme.relativeSpacing(p.withIconLeft ? 1 : 2),
  ],
}

const StyledButton = styled.button.attrs(attrs)`
  align-items: center;
  background-color: ${p => p.color};
  border: none;
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => readableColor(p.color)};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: ${p => (p.dense ? '0.875rem' : '1rem')};
  outline: none;
  padding: ${p => p.padding.join(' ')};
  transition: all 120ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:focus {
    box-shadow: 0 0 0 0.2rem
      ${p =>
        transparentize(
          0.5,
          p.color === p.theme.palette.white ? p.theme.palette.primary : p.color,
        )};
  }

  &:active {
    background-color: ${p => emphasize(p.color)};
    color: ${p => readableColor(emphasize(p.color))};
  }
`

const StyledContent = styled.span`
  margin-left: ${p => (p.withIconLeft ? p.theme.relativeSpacing() : '0')}
  margin-right: ${p => (p.withIconRight ? p.theme.relativeSpacing() : '0')}
`

function Button({
  children,
  color,
  dense,
  innerRef,
  renderIconLeft,
  renderIconRight,
  ...otherProps
}) {
  const iconLeft = renderIconLeft()
  const iconRight = renderIconRight()

  return (
    <StyledButton
      {...otherProps}
      innerRef={innerRef}
      color={color}
      dense={dense}
      withIconLeft={!!iconLeft}
      withIconRight={!!iconRight}
    >
      {iconLeft}
      <StyledContent withIconLeft={!!iconLeft} withIconRight={!!iconRight}>
        {children}
      </StyledContent>
      {iconRight}
    </StyledButton>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  dense: PropTypes.bool,
  innerRef: PropTypes.any,
  renderIconLeft: PropTypes.func,
  renderIconRight: PropTypes.func,
}

Button.defaultProps = {
  color: defaultColor,
  dense: false,
  renderIconLeft: () => null,
  renderIconRight: () => null,
}

export default Button
