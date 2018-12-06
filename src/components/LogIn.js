import React, { Component } from 'react';
import wait from 'waait';
import bcrypt from 'bcryptjs';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Form } from './styles/Form';

class DoSomethingOnce extends Component {
  componentWillMount() {
    this.props.action();
  }
  render() {
    return this.props.children || null;
  }
}

export default class LogIn extends Component {
  state = {
    username: '',
    password: '',
    skip: true,
    disabled: true
  };

  handleInput = async e => {
    const formData = {};
    formData[e.target.name] = e.target.value;

    this.setState({ ...formData });
    await wait();
    if (this.state.username && this.state.password) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  setToken = data => {
    localStorage.setItem('id_token', data.usernames[0].id);
    this.setState({
      username: '',
      password: ''
    });
    this.props.getUser();
  };
  render() {
    const { username, password, skip } = this.state;

    return (
      <Query query={GET_USER} variables={{ username, skip }}>
        {usernames => {
          if (usernames.loading) return 'Loading';
          if (usernames.data.usernames && usernames.data.usernames.length > 0) {
            console.log(usernames.data.usernames.password);
            if (
              bcrypt.compareSync(password, usernames.data.usernames[0].password)
            ) {
              return (
                <DoSomethingOnce action={() => this.setToken(usernames.data)} />
              );
            } else {
              return (
                <DoSomethingOnce
                  action={() =>
                    this.setState({
                      username: '',
                      password: '',
                      skip: true
                    })
                  }
                />
              );
            }
          }
          if (
            usernames.data.usernames &&
            usernames.data.usernames.length === 0
          ) {
            return (
              <DoSomethingOnce
                action={() =>
                  this.setState({
                    username: '',
                    password: '',
                    skip: true
                  })
                }
              />
            );
          }

          return (
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.setState({ skip: false });
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
              <button type="submit" disabled={this.state.disabled}>
                Log In
              </button>
            </Form>
          );
        }}
      </Query>
    );
  }
}

const GET_USER = gql`
  query GET_USER($username: String!, $skip: Boolean!) {
    usernames(first: 1, where: { username: $username }) @skip(if: $skip) {
      id
      username
      password
    }
  }
`;
