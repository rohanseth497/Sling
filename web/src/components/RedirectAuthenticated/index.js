import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectAuthenticated = ({
  pattern,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}) => (
  <Router
    pattern={pattern}
    exactly={exactly}
    render={(props) => {
      if (isAuthenticated) { return <Redirect to={{ pathname: '/' }} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Component {...props} />; }
      return null;
    }}
  />
);

RedirectAuthenticated.defaultProps = {
  pattern: '',
  component: React.createElement('div'),
  exactly: false,
  isAuthenticated: false,
  willAuthenticate: false,
};

RedirectAuthenticated.propTypes = {
  pattern: PropTypes.string,
  component: PropTypes.element,
  exactly: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  willAuthenticate: PropTypes.bool,
};

export default RedirectAuthenticated;
