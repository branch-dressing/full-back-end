require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(() => {
    Book.create({
      title: 'The Test: Before Each',
      author: 'Joel Patrick Durham',
      pages: 5,
      publicationYear: 2019
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a book', async() => {
    return request(app)
      .post('/api/v1/books')
      .send({
        title: 'The Test',
        author: 'Joel Patrick Durham',
        pages: 5,
        publicationYear: 2019
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'The Test',
          author: 'Joel Patrick Durham',
          pages: 5,
          publicationYear: 2019,
          shelves: [],
          __v: 0
        });
      });
  });

  it('can grab all books', () => {
    return request(app)
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'The Test: Before Each',
          author: 'Joel Patrick Durham',
          pages: 5,
          publicationYear: 2019,
          shelves: [],
          __v: 0
        });
      });
  });
});
