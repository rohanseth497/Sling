import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Route Categories
import MatchAuthenticated from '../MatchAuthenticated';
import RedirectAuthenticated from '../RedirectAuthenticated';

// Components
import Home from '../../containers/Home';
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';
import NotFound from '../../containers/NotFound';
import Room from '../../containers/Room';

const Routes = ({ isAuthenticated, willAuthenticate, location }) => {
  const authProps = { isAuthenticated, willAuthenticate };
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade"
      >
        <Switch location={location}>
          <MatchAuthenticated exact path="/" component={Home} {...authProps} />
          <RedirectAuthenticated path="/login" component={Login} {...authProps} />
          <RedirectAuthenticated path="/signup" component={Signup} {...authProps} />
          <MatchAuthenticated exact path="/r/:id" component={Room} {...authProps} />
          <Route component={NotFound} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};


export default withRouter(connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  null,
)(Routes));
