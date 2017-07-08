"use strict"

// CART REDUCERS
export function cartReducers(state={cart: []}, action) {
  switch (action.type) {
    case "ADD_TO_CART":
    return {...state,
      cart:action.payload,
      totalAmount: totals(action.payload).amount,
      totalQty: totals(action.payload).qty
    }
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
      cart:cartUpdate,
      totalAmount: totals(cartUpdate).amount,
      totalQty: totals(cartUpdate).qty
    }
    break;

    case "DELETE_CART_ITEM":
    return {...state,
      cart:action.payload,
      totalAmount: totals(action.payload).amount,
      totalQty: totals(action.payload).qty
    }
    break;
  }
  return state
}

// CALCULATE TOTALS
export function totals(payloadArr) {

  const totalAmount = payloadArr.map(function(cartArr) {
    return cartArr.price * cartArr.quantity;
  }).reduce(function(a, b) {
    return a + b;
  }, 0); // start summing from index 0

  const totalQty = payloadArr.map(function(qty) {
    return qty.quantity;
  }).reduce(function(a,b) {
    return a + b;
  }, 0)

  return {amount:totalAmount.toFixed(2), qty:totalQty}
}