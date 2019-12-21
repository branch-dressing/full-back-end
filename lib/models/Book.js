const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  myRating: {
    type: Number,
    required: true
  },
  avgRating: Number,
  binding: String,
  pages: {
    type: Number,
    required: true
  },
  publicationYear: Date,
  dateRead: Date,
  shelves: [String]
});

module.exports = mongoose.model('Book', schema);
