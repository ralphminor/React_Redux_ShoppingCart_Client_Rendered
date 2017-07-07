"use strict"

// Books Reducers
export function booksReducers(state={
  books:
  [{
    id: 1,
    title: 'this is the book title',
    description: 'this is the book description',
    price: 44.33
  },
  {
    id: 2,
    title: 'this is the second book title',
    description: 'this is the second book description',
    price: 55.99
  }]
}, action) {
  switch (action.type) {
    case "GET_BOOKS":
    return {...state, books:[...state.books]}
    break;

    case "POST_BOOK":
    return {books:[...state.books, ...action.payload]}
    break;

    case "DELETE_BOOK":
    // First create a copy of the current array of books
    const books_delete = [...state.books]
    // Find index of book to delete
    const indexToDelete = books_delete.findIndex(
      function(book) {
        return book.id === action.payload.id;
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
        return book.id === action.payload.id;
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