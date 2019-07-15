import PropTypes from 'prop-types'
import React from 'react'

export class ClickOutside extends React.Component {
  elementRef = React.createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)

    if (this.props.onEscape) {
      document.addEventListener('keydown', this.handleEscape)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)

    if (this.props.onEscape) {
      document.removeEventListener('keydown', this.handleEscape)
    }
  }

  componentDidUpdate(prevProps) {
    // We register the event listener only when needed.
    if (prevProps.onEscape && !this.props.onEscape) {
      document.removeEventListener('keydown', this.handleEscape)
    } else if (!prevProps.onEscape && this.props.onEscape) {
      document.addEventListener('keydown', this.handleEscape)
    }
  }

  handleClickOutside = e => {
    const elementRef = this.elementRef.current
    if (elementRef && !elementRef.contains(e.target)) {
      this.props.onClickOutside(e)
    }
  }

  handleEscape = e => {
    if (e.key === 'Escape') {
      this.props.onEscape(e)
    }
  }

  render() {
    return this.props.children({ ref: this.elementRef })
  }
}

ClickOutside.propTypes = {
  children: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  onEscape: PropTypes.func,
}
