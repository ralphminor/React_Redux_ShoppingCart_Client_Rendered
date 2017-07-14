"use strict"
import React from 'react'
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import combined reducers.
import reducers from './reducers/index';

// Import actions
import {addToCart} from './actions/cartActions';
import {postBook, updateBook, deleteBook} from './actions/booksActions';

// Step 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import Main from './main';

const Routes = (
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={BooksList}/>
          <Route path="/admin" component={BookForm}/>
          <Route path="/cart" component={Cart}/>
        </Route>
      </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
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