import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Transition } from 'react-spring';
// import { ITEMS_QUERY, CATEGORIES_QUERY, DELETE_ITEM } from '../App';
import Category from './Category';
export default class Categories extends Component {
  render() {
    return (
      <Query query={CATEGORIES_QUERY} variables={{ id: this.props.userId }}>
        {({ loading, data }) => {
          if (loading) return 'Loading';
          const { categories } = data;
          return (
            <Transition
              items={categories}
              keys={category => category.id}
              config={{ duration: 300 }}
              from={{ height: '0px', zIndex: 2 }}
              enter={{ height: '35px', zIndex: 2 }}
              leave={{
                transform: 'translateX(1000px)',
                height: '0px',
                zIndex: -2
              }}
            >
              {category => props => (
                <Category
                  props={props}
                  key={category.id}
                  category={category}
                  userId={this.props.userId}
                />
              )}
            </Transition>
          );
        }}
      </Query>
    );
  }
}

export const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY($id: ID) {
    categories(where: { username: { id: $id } }) {
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
`;
