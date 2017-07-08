"use strict"

// CART REDUCERS

export function cartReducers(state={cart: []}, action) {
  switch (action.type) {
    case "ADD_TO_CART":
    return {...state, cart:action.payload}
    break;

    case "UPDATE_CART":
    // First create a copy of the current cart
    const cart_update = [...state.cart]
    // Find index of book to update
    const indexToUpdate = cart_update.findIndex(
      function(book) {
        return book._id === action._id;
      }
    )

    const upDatedBook = {
      ...cart_update[indexToUpdate],
      quantity: cart_update[indexToUpdate].quantity + action.unit
    }

    let cartUpdate =  [...cart_update.slice(0, indexToUpdate), upDatedBook,
      ...cart_update.slice(indexToUpdate + 1)]

    return {...state,
      cart:cartUpdate
    }
    break;

    case "DELETE_CART_ITEM":
    return {...state, cart:action.payload}
    break;
  }
  return state
}