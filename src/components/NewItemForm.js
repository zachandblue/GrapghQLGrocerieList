import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CATEGORIES_QUERY } from './Categories';
import { Button } from './styles/Button';
import { ItemForm } from './styles/NewItemForm';

export default class NewItemForm extends Component {
  state = {
    item: ''
  };

  handleChange = e => {
    const item = e.target.value;
    this.setState({ item });
  };
  render() {
    return (
      <Mutation
        mutation={NEW_ITEM}
        refetchQueries={[{ query: CATEGORIES_QUERY }]}
      >
        {createItem => (
          <ItemForm
            onSubmit={e => {
              e.preventDefault();
              createItem({
                variables: {
                  title: this.state.item,
                  id: this.props.id
                }
              }).then(this.setState({ item: '' }));
            }}
          >
            <label htmlFor="item">
              <input
                type="text"
                value={this.state.item}
                placeholder="New Item..."
                onChange={this.handleChange}
              />
              <Button type="submit">+</Button>
            </label>
          </ItemForm>
        )}
      </Mutation>
    );
  }
}

const NEW_ITEM = gql`
  mutation NEW_ITEM($id: ID!, $title: String!, $body: String) {
    createItem(
      data: {
        title: $title
        body: $body
        category: { connect: { id: $id } }
        checked: false
      }
    ) {
      id
      title
      category {
        id
        title
      }
      checked
    }
  }
`;
