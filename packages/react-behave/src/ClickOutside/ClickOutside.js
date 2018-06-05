import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EventListener from 'react-event-listener';

class ClickOutside extends Component {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  };

  elementRef = React.createRef();

  handleClickOutside = e => {
    const elementRef = this.elementRef.current;
    if (!elementRef || !elementRef.contains(e.target)) {
      this.props.onClickOutside(e);
    }
  };

  render() {
    return (
      <EventListener target="document" onClick={this.handleClickOutside}>
        {this.props.render({ ref: this.elementRef })}
      </EventListener>
    );
  }
}

export default ClickOutside;
