"use strict"

// Books Reducers
export function booksReducers(state={
  books: []
}, action) {
  switch (action.type) {
    case "GET_BOOKS":
    return {...state, books:[...action.payload]}
    break;

    case "POST_BOOK":
    return {...state, books:[...state.books, ...action.payload], msg: 'Saved!  Click to continue.', style: 'success', validation: 'success'}
    break;

    case "POST_BOOK_REJECTED":
    return {...state, msg: 'Please, try again.', style: 'danger', validation: 'error'}
    break;

    case "RESET_BUTTON":
    return {...state, msg: null, style: 'primary', validation: null}
    break;

    case "DELETE_BOOK":
    // First create a copy of the current array of books
    const books_delete = [...state.books]
    // Find index of book to delete
    const indexToDelete = books_delete.findIndex(
      function(book) {
        return book._id.toString() === action.payload;
      }
    )
    return {books: [...books_delete.slice(0, indexToDelete),
      ...books_delete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":
    // First create a copy of the current array of books
    const books_update = [...state.books]
    // Find index of book to update
    const indexToUpdate = books_update.findIndex(
      function(book) {
        return book._id === action.payload._id;
      }
    )
    // Create a new book object with the updated values
    const upDatedBook = {
      ...books_update[indexToUpdate],
      title: action.payload.title
    }
    // Show the new book object
    console.log("The new book object: ", upDatedBook);
    // Use slice to remove the book at the specified index, add the updated book plus any books in the array thereafter
    return {books: [...books_update.slice(0, indexToUpdate), upDatedBook,
      ...books_update.slice(indexToUpdate + 1)]}
    break;
  }
  return state
}