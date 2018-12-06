import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Transition, config } from 'react-spring';
import { CATEGORIES_QUERY } from './Categories';
import NewItemForm from './NewItemForm';
import { CategoryContainer } from './styles/Category';
import { Button } from './styles/Button';
import { Icon } from './styles/Icon';
import Item from './Item';

export default class Category extends Component {
  state = {
    open: true,
    completed: false
  };
  componentDidMount() {
    this.setState({ completed: false });
  }

  render() {
    const { category } = this.props;
    return (
      <CategoryContainer key={category.id}>
        <div
          style={this.props.props}
          className={
            category.items.every(item => item.checked === true)
              ? 'completed main'
              : 'main'
          }
        >
          <h1 onClick={() => this.setState({ open: !this.state.open })}>
            {this.props.category.title}
          </h1>
          <Mutation
            mutation={DELETE_CATEGORY}
            refetchQueries={[
              { query: CATEGORIES_QUERY, variables: { id: this.props.userId } }
            ]}
            key={category.id}
          >
            {deleteCategory => (
              <Button
                onClick={() =>
                  deleteCategory({
                    variables: {
                      id: category.id
                    }
                  })
                }
                className={
                  category.items.every(item => item.checked === true)
                    ? 'completed '
                    : ''
                }
              >
                <Icon className="fa fa-trash" />
              </Button>
            )}
          </Mutation>
        </div>

        {this.state.open && (
          <Fragment>
            <Transition
              items={this.props.category.items}
              keys={item => item.id}
              config={config.wobbly}
              initial={{ height: '0px', zIndex: 2 }}
              from={{ height: '0px', zIndex: 2 }}
              enter={{ height: '35px', zIndex: 2 }}
              leave={{
                transform: 'translateX(1000px)',
                height: '0px',
                zIndex: -2
              }}
            >
              {item => props => (
                <div style={props}>
                  {
                    <Mutation
                      mutation={DELETE_ITEM}
                      refetchQueries={[
                        {
                          query: CATEGORIES_QUERY,
                          variables: { id: this.props.userId }
                        }
                      ]}
                      key={item.id}
                    >
                      {deleteItem => (
                        <Item
                          item={item}
                          deleteItem={deleteItem}
                          checkIfCompleted={this.checkIfCompleted}
                        />
                      )}
                    </Mutation>
                  }
                </div>
              )}
            </Transition>
            <NewItemForm id={this.props.category.id} />
          </Fragment>
        )}
      </CategoryContainer>
    );
  }
}

export const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    deleteItem(where: { id: $id }) {
      id
      title
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DELETE_CATEGORY($id: ID!) {
    deleteCategory(where: { id: $id }) {
      id
      title
    }
  }
`;
