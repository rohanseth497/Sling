import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/Session';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.shape,
  }

  handleLogin = (data) => {
    const { loginUser } = this.props;
    loginUser(data);
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { loginUser: login },
)(Login);
