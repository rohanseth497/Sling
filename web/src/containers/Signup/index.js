import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/Session';
import Navbar from '../../components/Navbar';
import SignupForm from '../../components/SignupForm';

class Signup extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleSignup = data => this.props.signup(data, this.context.router)

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

export default connect(
  null,
  { signup },
)(Signup);
