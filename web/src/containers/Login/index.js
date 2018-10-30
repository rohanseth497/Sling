import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/Session';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleLogin = data => this.props.login(data, this.context.router);

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
  login: PropTypes.func.isRequired,
};

export default connect(
  null,
  { login },
)(Login);
