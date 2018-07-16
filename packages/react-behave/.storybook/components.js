import { Component } from 'react';

class WithRef extends Component {
  ref = null;

  setRef = ref => {
    this.ref = ref;
    this.forceUpdate();
  };

  render() {
    return this.props.children(this.setRef, this.ref);
  }
}

class WithState extends Component {
  static defaultProps = {
    initialState: {},
  };

  state = this.props.initialState;

  render() {
    return this.props.children(this.state, state => this.setState(state));
  }
}

export { WithRef, WithState };
