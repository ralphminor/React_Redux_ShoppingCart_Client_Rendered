"use strict"
import axios from 'axios';

// GET ALL BOOKS
export function getBooks() {
  return function(dispatch) {
    axios.get("/api/books")
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
    axios.post("/api/books", book)
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
  return function(dispatch) {
    axios.delete("/api/books/" + id)
      .then(function(response) {
        dispatch({type:"DELETE_BOOK", payload:id})
      })
      .catch(function(err) {
        dispatch({type:"DELETE_BOOK_REJECTED", payload:err})
      })
    }
  }

// UPDATE A BOOK
export function updateBook(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}

// RESET BUTTON
export function resetButton() {
  return {
    type: "RESET_BUTTON"
  }
}

