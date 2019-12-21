const { Router } = require('express');
const Book = require('../models/Book');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', (req, res, next) => {
    Book
      .create(req.body)
      .then(book => res.send(book))
      .catch(next);
  });
