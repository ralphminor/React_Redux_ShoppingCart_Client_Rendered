"use strict"

// ADD TO CART
export function addToCart(book) {
  return {
  type:"ADD_TO_CART",
  payload: book
  }
}

// DELETE CART ITEM
export function deleteCartItem(cart) {
  return {
  type:"DELETE_CART_ITEM",
  payload: cart
  }
}

