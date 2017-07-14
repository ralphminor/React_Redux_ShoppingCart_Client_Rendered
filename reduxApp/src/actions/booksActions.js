"use strict"
import axios from 'axios';

// GET ALL BOOKS
export function getBooks() {
  return function(dispatch) {
    axios.get("/books")
      .then(function(response) {
        dispatch({type:"GET_BOOKS", payload: response.data})
      })
      .catch(function(err) {
        dispatch({type:"GET_BOOKS_REJECTED", payload: err})
      })
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

