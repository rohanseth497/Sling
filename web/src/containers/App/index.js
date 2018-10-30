import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticate } from '../../actions/Session';
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

App.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { authenticateUser: authenticate },
)(App);
