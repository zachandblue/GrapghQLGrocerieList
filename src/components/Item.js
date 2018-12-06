import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CATEGORIES_QUERY } from './Categories';
import { StyledItem } from './styles/Item';
import { Icon } from './styles/Icon';
import { Button } from './styles/Button';

export default class Item extends Component {
  state = {
    checked: false
  };
  render() {
    const { item, deleteItem } = this.props;
    return (
      <StyledItem>
        <Mutation
          mutation={UPDATE_ITEM}
          refetchQueries={[{ query: CATEGORIES_QUERY }]}
        >
          {updateItem => (
            <div
              className={!item.checked ? 'main' : 'main completed'}
              onClick={() =>
                updateItem({
                  variables: {
                    id: item.id,
                    title: item.title,
                    checked: !item.checked
                  },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    updateItem: {
                      id: item.id,
                      title: item.title,
                      __typename: 'Item',
                      checked: !item.checked
                    }
                  }
                })
              }
            >
              <Icon
                className={
                  item.checked ? 'fa fa-check-circle-o' : 'fa fa-circle-o'
                }
              />
              <h4>{item.title}</h4>
            </div>
          )}
        </Mutation>

        <Button
          className={!item.checked ? '' : ' completed'}
          onClick={() => {
            deleteItem({
              variables: {
                id: item.id
              }
            });
          }}
        >
          <Icon className="fa fa-trash" />
        </Button>
      </StyledItem>
    );
  }
}
const UPDATE_ITEM = gql`
  mutation UPDATE_ITEM($id: ID!, $checked: Boolean!, $title: String) {
    updateItem(where: { id: $id }, data: { checked: $checked, title: $title }) {
      id
      title
      checked
    }
  }
`;
