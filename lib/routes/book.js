const { Router } = require('express');
const Book = require('../models/Book');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', (req, res, next) => {
    Book
      .create(req.body)
      .then(book => res.send(book))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Book
      .find()
      .then(books => res.send(books))
      .catch(next);
  });
