"use strict"

// ADD TO CART
export function addToCart(book) {
  return {
  type:"ADD_TO_CART",
  payload: book
  }
}

