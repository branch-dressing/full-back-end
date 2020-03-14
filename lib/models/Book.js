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
  myRating: Number,
  avgRating: Number,
  binding: {
    type: String,
    required: true,
    enum: ['hardback', 'paperback', 'mass market']
  },
  pages: {
    type: Number,
    required: true
  },
  publicationYear: Number,
  dateRead: Date,
  shelves: [String]
});

module.exports = mongoose.model('Book', schema);
