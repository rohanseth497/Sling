import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/Session';
import Navbar from '../../components/Navbar';
import SignupForm from '../../components/SignupForm';

class Signup extends React.Component {
  static contextTypes = {
    router: PropTypes.shape,
  }

  handleSignup = (data) => {
    const { signUpUser } = this.props;
    const { router } = this.context;
    signUpUser(data, router);
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

Signup.propTypes = {
  signUpUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { signUpUser: signup },
)(Signup);
