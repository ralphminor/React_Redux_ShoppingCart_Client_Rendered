"use strict"
import {createStore} from 'redux';

// Import combined reducers.
import reducers from './reducers/index';

// Import actions
import {addToCart} from './actions/cartActions';
import {postBook, updateBook, deleteBook} from './actions/booksActions';

// Step 1 create the store
const store = createStore(reducers);

store.subscribe(function() {
  console.log('current state is: ', store.getState());
})

// Step 2 create and dispatch actions
// Add a book
store.dispatch(postBook(
  [{
    id: 1,
    title: 'this is the book title',
    description: 'this is the book description',
    price: 33.33
  },
  {
    id: 2,
    title: 'this is the second book title',
    description: 'this is the second book description',
    price: 10.99
  }]
))

// Delete a book
store.dispatch(deleteBook(
  {id: 1}
))

// Update a book
store.dispatch(updateBook(
  {
    id: 2,
    title: "Learn React and Redux"
  }
))

// -->> CART ACTIONS <<--
// ADD to cart
store.dispatch(addToCart([{id: 1}]));