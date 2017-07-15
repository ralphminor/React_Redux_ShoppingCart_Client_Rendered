"use strict"

// ADD TO CART
export function addToCart(book) {
  return {
  type:"ADD_TO_CART",
  payload: book
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

  return {
    type:"UPDATE_CART",
    payload:cartUpdate
  }
}

// DELETE CART ITEM
export function deleteCartItem(cart) {
  return {
  type:"DELETE_CART_ITEM",
  payload: cart
  }
}

