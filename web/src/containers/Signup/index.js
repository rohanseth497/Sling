import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/Session';
import Navbar from '../../components/Navbar';
import SignupForm from '../../components/SignupForm';

class Signup extends React.Component {
  handleSignup = (data) => {
    const { signUpUser } = this.props;
    signUpUser(data);
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

export default withRouter(connect(
  null,
  { signUpUser: signup },
)(Signup));
