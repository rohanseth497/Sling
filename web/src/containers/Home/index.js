import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/Session';
import Navbar from '../../components/Navbar';
import RoomListItem from '../../components/RoomListItem';

class Home extends React.Component {
  handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        {isAuthenticated && (
          <div>
            <span>{currentUser.username}</span>
            <button type="button" onClick={this.handleLogout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}

Home.defaultProps = {
  isAuthenticated: false,
  currentUser: {},
};

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  currentUser: PropTypes.instanceOf(Object),
};

export default withRouter(connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logoutUser: logout },
)(Home));
