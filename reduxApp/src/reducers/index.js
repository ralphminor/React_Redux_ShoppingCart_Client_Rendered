"use strict"
import {combineReducers} from 'redux';

// Import reducers that are to be combined.
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

// Combine the reducers
export default combineReducers({
  books: booksReducers,
  cart: cartReducers
})