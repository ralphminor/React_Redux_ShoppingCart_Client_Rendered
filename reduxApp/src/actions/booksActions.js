"use strict"
import axios from 'axios';

// GET ALL BOOKS
export function getBooks() {
  return {
    type: "GET_BOOKS"
  }
}
// POST A BOOK
export function postBook(book) {
  return function(dispatch) {
    axios.post("/books", book)
      .then(function(response) {
        dispatch({type:"POST_BOOK", payload: response.data})
      })
      .catch(function(err) {
        dispatch({type:"POST_BOOK_REJECTED", payload:"An error occured while adding a book."})
      })
  }
}

// DELETE A BOOK
export function deleteBook(id) {
  return {
    type: "DELETE_BOOK",
    payload: id
  }

}

// UPDATE A BOOK
export function updateBook(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}

