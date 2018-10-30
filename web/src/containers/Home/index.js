import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/Session';
import Navbar from '../../components/Navbar';

class Home extends React.Component {

  
  handleLogout = () => this.props.logout()

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        {isAuthenticated &&
          <div>
            <span>{currentUser.username}</span>
            <button type="button" onClick={this.handleLogout}>Logout</button>
          </div>
        }
      </div>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  isAuthenticated: PropTypes.bool,
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser
  }),
  { logout }
)(Home);