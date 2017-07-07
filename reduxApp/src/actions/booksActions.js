"use strict"

// GET ALL BOOKS
export function getBooks() {
  return {
    type: "GET_BOOKS"
  }
}
// POST A BOOK
export function postBook(book) {
  return {
    type: "POST_BOOK",
    payload: book
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

