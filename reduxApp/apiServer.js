var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

//----->>> SET UP SESSIONS <<<-----
app.use(session({
  secret: 'mySecretString67',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  // ttl: 2 days * 24 hrs * 60 mins * 60 secs
}))
  // SAVE SESSION CART API
  app.post('/cart', function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err) {
      if (err) {
        throw err;
      }
      res.json(req.session.cart);
    })
  });
  // GET SESSION CART API
  app.get('/cart', function(req, res) {
    if(typeof req.session.cart !== 'undefined') {
      res.json(req.session.cart);
    }
  });
//----->>> END SESSION SET UP <<<-----

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

//----->>> GET BOOKS IMAGES <-----
app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images/';
  //REQUIRE FILE SYSTEM
  const fs = require('fs');
  // READ ALL FILES IN THE IMAGE FOLDER
  fs.readdir(imgFolder, function(err, imgFiles) {
    if (err) {
      return console.error(err);
    }
    // INITIALIZE AN EMPTY IMAGE FILES ARRAY
    const imgFilesArr = [];
    // ADD THE IMAGE FILES TO THE IMAGES ARRAY
    imgFiles.forEach(function(file) {
      imgFilesArr.push({name: file});
    });
    // SEND THE JSON RESPONSE WITH THE IMAGES ARRAY
    res.json(imgFilesArr);
  })
})

// END APIs

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})