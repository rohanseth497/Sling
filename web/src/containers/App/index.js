import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticate, unauthenticate } from '../../actions/Session';
import Home from '../Home';
import NotFound from '../NotFound';
import Login from '../Login';
import Signup from '../Signup';

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
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

App.defaultProps = {
  isAuthenticated: false,
  willAuthenticate: false,
};

App.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  unauthenticateUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  willAuthenticate: PropTypes.bool,
};

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  { authenticateUser: authenticate, unauthenticateUser: unauthenticate },
)(App);
