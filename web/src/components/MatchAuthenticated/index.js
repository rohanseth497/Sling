import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const MatchAuthenticated = ({
  pattern,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}) => (
  <Route
    path={pattern}
    exact={exactly}
    render={(props) => {
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Redirect to={{ pathname: '/login' }} />; }
      return null;
    }}
  />
);

MatchAuthenticated.defaultProps = {
  pattern: '',
  component: () => {},
  exactly: false,
  isAuthenticated: false,
  willAuthenticate: false,
};

MatchAuthenticated.propTypes = {
  pattern: PropTypes.string,
  component: PropTypes.func,
  exactly: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  willAuthenticate: PropTypes.bool,
};

export default MatchAuthenticated;
