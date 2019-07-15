import createFocusTrap from 'focus-trap'
import invariant from 'invariant'
import PropTypes from 'prop-types'
import React from 'react'
import warning from 'warning'

export class FocusTrap extends React.Component {
  previouslyFocusedElement = document.activeElement
  trappedElement = React.createRef()
  fallbackElement = React.createRef()
  focusTrap = null

  componentDidMount() {
    if (this.props.active) {
      this.activate()
    }
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props

    if (prevProps.active !== active) {
      if (active) {
        this.previouslyFocusedElement = document.activeElement
        this.activate()
      } else {
        this.deactivate()
      }
    }
  }

  componentWillUnmount() {
    if (this.props.active) {
      this.deactivate()
    }
  }

  activate() {
    const {
      active,
      children,
      escapeDeactivates,
      fallbackFocus,
      ...rest
    } = this.props

    invariant(
      this.trappedElement.current,
      'The ref prop must be applied on the trapped element in order for FocusTrap to work.',
    )

    warning(
      escapeDeactivates == null,
      'The option escapeDeactivates is set to false. Simply unmount FocusTrap to deactivate the trap.',
    )

    warning(
      fallbackFocus == null,
      'Use the render prop fallbackRef instead of the fallbackFocus option.',
    )

    this.focusTrap = createFocusTrap(this.trappedElement.current, {
      ...rest,
      fallbackFocus: this.fallbackElement.current,

      // We handle the return of the focus ourself because React can move the
      // focus into a children element before this lifecycle hook (did mount) is
      // called. This means that focus-trap might try to give the focus back to
      // the wrong element.
      returnFocusOnDeactivate: false,

      // We handle the `Escape` key by unmounting the `FocusTrap` element.
      escapeDeactivates: false,
    })

    this.focusTrap.activate()
  }

  deactivate() {
    this.focusTrap.deactivate()
    this.focusTrap = null

    if (this.previouslyFocusedElement && this.props.returnFocusOnDeactivate) {
      // For some reason if `focus` is called synchronously during the clean up,
      // the component will not be called on its `onFocus` props.
      setTimeout(() => this.previouslyFocusedElement.focus())
    }
  }

  render() {
    return this.props.children({
      ref: this.trappedElement,
      fallbackRef: this.fallbackElement,
    })
  }
}

FocusTrap.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.func.isRequired,
  returnFocusOnDeactivate: PropTypes.bool,
}

FocusTrap.defaultProps = {
  active: true,
}
