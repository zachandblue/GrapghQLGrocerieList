import React, { Component, Fragment } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User from './components/User';
import ReactLoading from 'react-loading';
import CreateCategoryForm from './components/CreateCategoryForm';
import Categories from './components/Categories';
import { Container } from './components/styles/Container';
import { Spinner } from './components/styles/Spinner';
import { LogOut } from './components/styles/LogOut';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/cjp1m0c1t6p5601fuuxkzeg95/master'
});

class App extends Component {
  state = {
    loggedIn: false,
    user: ''
  };

  componentWillMount() {
    this.getUser();
  }

  getUser = () => {
    const user = localStorage.getItem('id_token');

    this.setState({ user });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <Container className="App">
          <Query
            query={USER_QUERY}
            variables={{ id: this.state.user || 'empty' }}
          >
            {({ loading, data }) => {
              if (loading)
                return (
                  <Spinner>
                    <ReactLoading
                      type="spin"
                      color="grey"
                      height="50px"
                      width="50px"
                    />
                  </Spinner>
                );
              if (data && data.username) {
                return (
                  <Fragment>
                    <CreateCategoryForm userId={data.username.id} />
                    <Categories userId={data.username.id} />
                    <LogOut
                      className="log-out"
                      onClick={() => {
                        localStorage.removeItem('id_token');
                        this.getUser();
                      }}
                    >
                      Log out
                    </LogOut>
                  </Fragment>
                );
              } else {
                return <User getUser={this.getUser} />;
              }
            }}
          </Query>
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;

export const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    username(where: { id: $id }) {
      id
      username
      categories {
        id
        title
        items {
          id
          title
          category {
            id
            title
          }
          checked
        }
      }
    }
  }
`;
