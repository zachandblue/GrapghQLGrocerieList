import React, { Component } from 'react';
import wait from 'waait';
import bcrypt from 'bcryptjs';
import { Form } from './styles/Form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { USER_QUERY } from '../App';

export default class SignUp extends Component {
  state = {
    username: '',
    password: '',
    passwordconfirm: '',
    disabled: true,
    error: ''
  };

  handleInput = async e => {
    const formData = {};
    formData[e.target.name] = e.target.value;

    this.setState({ ...formData });
    await wait();
    if (
      this.state.username &&
      this.state.password &&
      this.state.passwordconfirm &&
      this.state.password === this.state.passwordconfirm
    ) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  encryptPassword = password => {
    const salt = bcrypt.genSaltSync(2);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  render() {
    const { username, password, passwordconfirm } = this.state;
    let token;

    return (
      <Mutation
        mutation={NEW_USER}
        variables={{
          username: this.state.username,
          password: this.encryptPassword(password),
          passwordconfirm: this.encryptPassword(passwordconfirm)
        }}
        refetchQueries={async () => {
          return [{ query: USER_QUERY, variables: { id: await token } }];
        }}
      >
        {(createUsername, { error }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();

                createUsername()
                  .then(res => {
                    localStorage.setItem(
                      'id_token',
                      res.data.createUsername.id
                    );
                    token = res.data.createUsername.id;
                    this.props.getUser();
                  })

                  .then(
                    this.setState({
                      username: '',
                      password: '',
                      passwordconfirm: ''
                    })
                  )
                  .catch(err => {
                    if (err.message.includes('500')) {
                      this.setState({
                        error: 'Try Again, User Name may be taken'
                      });
                    }
                  });
              }}
            >
              <input
                name="username"
                type="text"
                onChange={this.handleInput}
                value={username}
                placeholder="username"
              />
              <input
                name="password"
                type="password"
                onChange={this.handleInput}
                value={password}
                placeholder="password"
              />
              <input
                name="passwordconfirm"
                type="password"
                onChange={this.handleInput}
                value={passwordconfirm}
                placeholder="confirm password"
              />
              <p>{this.state.error}</p>
              <button type="submit" disabled={this.state.disabled}>
                Sign Up
              </button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

const NEW_USER = gql`
  mutation NEW_USER(
    $username: String!
    $password: String!
    $passwordconfirm: String!
  ) {
    createUsername(
      data: {
        username: $username
        password: $password
        passwordconfirm: $passwordconfirm
      }
    ) {
      id
      username
    }
  }
`;
