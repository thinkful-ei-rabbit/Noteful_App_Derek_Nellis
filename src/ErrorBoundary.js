import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>You broke it!</h2>
          <a href="/">Click me to be saved!</a>
        </>
      );
    }
    return this.props.children;
  }
}
