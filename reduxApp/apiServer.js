var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var Books = require('./models/books.js');

//----->>> POST BOOKS <<<-----
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

//----->>> GET BOOKS <<<-----
app.get('/books', function(req, res){
  Books.find(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books)
  })
});

//----->>>DELETE BOOK<<<-----
app.delete('/books/:_id', function(req,res) {
  var query = {_id: req.params._id}
  Books.remove(query, function(err, books){
    if (err) {
      throw err;
    }
    res.json(books);
  })
});

//----->>>UPDATE BOOK<<<-----
app.put('/books/:_id', function(req, res) {
  var book = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
    // Set option 'new' to true to return the updated document
    var options = {new: true};

    Books.findOneAndUpdate(query, update, options, function(err, book) {
      if (err) {
        throw err;
      }
      res.json(book);
    })
});

// END APIs

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})