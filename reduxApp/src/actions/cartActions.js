"use strict"

// ADD TO CART
export function addToCart(book) {
  return {
  type:"ADD_TO_CART",
  payload: book
  }
}

// UPDATE CART
export function updateCart(_id, unit) {
  return {
    type:"UPDATE_CART",
    _id: _id,
    unit: unit
  }
}

// DELETE CART ITEM
export function deleteCartItem(cart) {
  return {
  type:"DELETE_CART_ITEM",
  payload: cart
  }
}

