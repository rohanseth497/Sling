import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const MatchAuthenticated = ({
  path,
  exact,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => {
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!isAuthenticated) { return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />; }
      return null;
    }}
  />
);

MatchAuthenticated.defaultProps = {
  path: '',
  component: () => {},
  exact: false,
  isAuthenticated: false,
  willAuthenticate: false,
};

MatchAuthenticated.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
  exact: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  willAuthenticate: PropTypes.bool,
};

export default withRouter(MatchAuthenticated);
