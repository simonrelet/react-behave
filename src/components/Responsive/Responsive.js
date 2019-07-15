import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import memoize from 'memoize-one'
import PropTypes from 'prop-types'
import React from 'react'
import { getScreenSize } from '../../core/getScreenSize'

function smallerOrEqualTo(screenSizes, refScreenSize, screenSize) {
  return screenSizes[screenSize] <= screenSizes[refScreenSize]
}

function biggerOrEqualTo(screenSizes, refScreenSize, screenSize) {
  return screenSizes[screenSize] >= screenSizes[refScreenSize]
}

export class Responsive extends React.Component {
  getScreenSize = memoize(getScreenSize, isEqual)

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.handleResize.cancel()
  }

  handleResize = debounce(() => this.forceUpdate(), this.props.resizeInterval)

  render() {
    const { children, maximum, minimum, screenSizes } = this.props
    const screenSize = this.getScreenSize(screenSizes, window.innerWidth)
    let visible = true

    if (minimum) {
      visible = biggerOrEqualTo(screenSizes, minimum, screenSize)
    }

    if (visible && maximum) {
      visible = smallerOrEqualTo(screenSizes, maximum, screenSize)
    }

    if (visible) {
      if (typeof children === 'function') {
        return children(screenSize, window.innerWidth)
      }

      return children
    }

    return null
  }
}

Responsive.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  maximum: PropTypes.string,
  minimum: PropTypes.string,
  resizeInterval: PropTypes.number,
  screenSizes: PropTypes.object,
}

Responsive.defaultProps = {
  // Corresponds to 10 frames at 60 Hz
  resizeInterval: 166,
  screenSizes: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}
