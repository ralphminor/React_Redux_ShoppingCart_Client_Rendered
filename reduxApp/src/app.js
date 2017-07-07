"use strict"
import React from 'react'
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

// Import combined reducers.
import reducers from './reducers/index';

// Import actions
import {addToCart} from './actions/cartActions';
import {postBook, updateBook, deleteBook} from './actions/booksActions';

// Step 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

import BooksList from './components/pages/bookslist';

render(
  <Provider store={store}>
    <BooksList />
  </Provider>, document.getElementById('app')
);

// Step 2 create and dispatch actions

// -->> BOOK ACTIONS <<--

// Add a book
// store.dispatch(postBook(

// ))

// // Delete a book
// store.dispatch(deleteBook(
//   {id: 1}
// ))

// // Update a book
// store.dispatch(updateBook(
//   {
//     id: 2,
//     title: "Learn React and Redux"
//   }
// ))

// // -->> CART ACTIONS <<--
// // ADD to cart
// store.dispatch(addToCart([{id: 1}]));