const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true
  },
  author1: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author2: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  isbn: {
    type: Number,
    required: false
  }
});

let Books = mongoose.model('Book', bookSchema);

module.exports = Books;
