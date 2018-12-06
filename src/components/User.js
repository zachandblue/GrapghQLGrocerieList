import React, { Component } from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';

export default class User extends Component {
  render() {
    return (
      <div>
        <SignUp getUser={this.props.getUser} />
        <LogIn getUser={this.props.getUser} />
      </div>
    );
  }
}
