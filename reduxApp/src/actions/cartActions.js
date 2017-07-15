"use strict"
import axios from 'axios';

// GET CART
export function getCart() {
  return function(dispatch) {
    axios.get('/api/cart')
      .then(function(response) {
        dispatch({type:"GET_CART", payload:response.data})
      })
      .catch(function(err) {
        dispatch({type:"GET_CART_REJECTED", msg:"Error when getting the cart from session."})
      })
  }
}

// ADD TO CART
export function addToCart(cart) {
  return function(dispatch) {
    axios.post('/api/cart', cart)
      .then(function(response) {
        dispatch({type:"ADD_TO_CART", payload: response.data})
      })
      .catch(function(err) {
        dispatch({type:"ADD_TO_CART_REJECTED", msg: 'Error when adding to cart.'})
      })
  }
}

// UPDATE CART
export function updateCart(_id, unit, cart) {
      // First create a copy of the current cart
    const cart_update = cart
    // Find index of book to update
    const indexToUpdate = cart_update.findIndex(
      function(book) {
        return book._id === _id;
      }
    )

    const upDatedBook = {
      ...cart_update[indexToUpdate],
      quantity: cart_update[indexToUpdate].quantity + unit
    }

    let cartUpdate =  [...cart_update.slice(0, indexToUpdate), upDatedBook,
      ...cart_update.slice(indexToUpdate + 1)]

    return function(dispatch) {
      axios.post('/api/cart', cartUpdate)
        .then(function(response) {
          dispatch({type:"UPDATE_CART", payload: response.data})
        })
        .catch(function(err) {
          dispatch({type:"UPDATE_CART_REJECTED", msg: 'Error when updating cart.'})
        })
    }
}

// DELETE CART ITEM
export function deleteCartItem(cart) {
  return function(dispatch) {
    axios.post('/api/cart', cart)
      .then(function(response) {
        dispatch({type:"DELETE_CART_ITEM", payload: response.data})
      })
      .catch(function(err) {
        dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'Error when deleting cart item.'})
      })
  }
}

