const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const bookRouter = express.Router();
const Books = require('../models/books.ts');

bookRouter.route('/')
.get((req, res, next) => {
  Books.find(req.query)
  .then((books) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log('Books: ');
    console.log('Session in bookRouter: ', req.session);
    console.log('req.user ', req.user);
    res.json(books);
  })
  .catch(err => {
    res.status(400).send('Unable to get data from database', err);
  });
})
.post((req, res, next) => {
  Books.create(req.body)
  .then((dish) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(dish);
  })
  .catch(err => {
    res.status(400).send('Unable to save to database');
  });
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
  Books.deleteMany({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  });
});


bookRouter.route('/:bookId')
.get((req, res, next) => {
  Books.findById(req.params.bookId)
  .then((book) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(book);
  });
})
.post((req, res, next) => {
  res.statusCode = 403;
        res.end('POST operation not supported on /books/' + req.params.bookId);
})
.put((req, res, next) => {
  console.log('Inside Put ', req.body);
  Books.findByIdAndUpdate(req.params.bookId, {
    $set: req.body
  }, {new: true})
  .then((book) => {
    console.log('Inside Put statement');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // res.json('bookRouter PUT: ', book);
    res.status(200).json(book);
  });
})
.delete((req, res, next) => {
  Books.findByIdAndRemove(req.params.bookId)
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  });
});

module.exports = bookRouter;
