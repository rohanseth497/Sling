import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticate, unauthenticate, logout } from '../../actions/Session';
import Routes from '../../routes/Routes';
import Sidebar from '../../components/Sidebar';

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

  handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const { isAuthenticated, currentUserRooms } = this.props;
    console.log('CurrentRooms:', currentUserRooms);
    return (
      <div style={{ display: 'flex', flex: '1' }}>
        {isAuthenticated && (
          <Sidebar
            rooms={currentUserRooms}
            onLogoutClick={this.handleLogout}
          />
        )}
        <Routes />
      </div>
    );
  }
}

App.defaultProps = {
  isAuthenticated: false,
  currentUserRooms: [],
};

App.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  unauthenticateUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  currentUserRooms: PropTypes.instanceOf(Array),
};

export default withRouter(connect(
  state => ({
    currentUserRooms: state.rooms.currentUserRooms,
    isAuthenticated: state.session.isAuthenticated,
  }),
  {
    authenticateUser: authenticate,
    unauthenticateUser: unauthenticate,
    logoutUser: logout,
  },
)(App));
