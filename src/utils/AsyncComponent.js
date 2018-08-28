import React from 'react'
const asyncComponent = loadComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    };

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module)
        .then((Component) => {
          this.setState({ Component });
        })
        .catch((err) => {
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return (Component) ? <Component {...this.props} /> : null;
    }
  }
);

export default asyncComponent
