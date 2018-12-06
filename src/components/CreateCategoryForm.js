import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CATEGORIES_QUERY } from './Categories';
import { CategoryForm } from './styles/CategoryForm';
import { Button } from './styles/Button';

export default class CreateCategoryForm extends Component {
  state = {
    category: ''
  };

  handleChange = e => {
    const category = e.target.value;
    this.setState({ category });
  };
  render() {
    return (
      <Mutation
        mutation={NEW_CATEGORY}
        refetchQueries={[
          { query: CATEGORIES_QUERY, variables: { id: this.props.userId } }
        ]}
      >
        {createCategory => (
          <CategoryForm
            onSubmit={e => {
              e.preventDefault();
              createCategory({
                variables: {
                  id: this.props.userId,
                  title: this.state.category
                }
              }).then(this.setState({ category: '' }));
            }}
          >
            <label htmlFor="category">
              <input
                type="text"
                value={this.state.category}
                onChange={this.handleChange}
                placeholder="New Category..."
              />
            </label>
            <Button type="submit">+</Button>
          </CategoryForm>
        )}
      </Mutation>
    );
  }
}

const NEW_CATEGORY = gql`
  mutation NEW_CATEGORY($id: ID, $title: String!) {
    createCategory(
      data: { title: $title, username: { connect: { id: $id } } }
    ) {
      id
      title
      username {
        id
      }
    }
  }
`;
