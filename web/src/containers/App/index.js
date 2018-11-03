import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticate, unauthenticate } from '../../actions/Session';
import Routes from '../../routes/Routes';

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { authenticateUser } = this.props;
      authenticateUser();
    } else {
      const { unauthenticateUser } = this.props;
      unauthenticateUser();
    }
  }

  render() {
    return (
      <Routes />
    );
  }
}

App.defaultProps = {
  // isAuthenticated: false,
  // willAuthenticate: false,
};

App.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  unauthenticateUser: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
  // willAuthenticate: PropTypes.bool,
};

export default withRouter(connect(
  null,
  {
    authenticateUser: authenticate,
    unauthenticateUser: unauthenticate,
  },
)(App));
