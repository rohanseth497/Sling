import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Route Categories
import MatchAuthenticated from '../MatchAuthenticated';
import RedirectAuthenticated from '../RedirectAuthenticated';

// Components
import Home from '../../containers/Home';
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';
import NotFound from '../../containers/NotFound';
import Room from '../../containers/Room';

const Routes = ({ isAuthenticated, willAuthenticate }) => {
  const authProps = { isAuthenticated, willAuthenticate };
  return (
    <Switch>
      <MatchAuthenticated exact path="/" component={Home} {...authProps} />
      <RedirectAuthenticated path="/login" component={Login} {...authProps} />
      <RedirectAuthenticated path="/signup" component={Signup} {...authProps} />
      <MatchAuthenticated exact path="/r/:id" component={Room} {...authProps} />
      <Route component={NotFound} />
    </Switch>
  );
};


export default withRouter(connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  null,
)(Routes));
