import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectAuthenticated = ({
  path,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}) => (
  <Route
    path={path}
    exact={exactly}
    render={(props) => {
      if (isAuthenticated) { return <Redirect to={{ pathname: '/', state: { from: props.location } }} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Component {...props} />; }
      return null;
    }}
  />
);

RedirectAuthenticated.defaultProps = {
  path: '',
  component: () => {},
  exactly: false,
  isAuthenticated: false,
  willAuthenticate: false,
};

RedirectAuthenticated.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
  exactly: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  willAuthenticate: PropTypes.bool,
};

export default withRouter(RedirectAuthenticated);
