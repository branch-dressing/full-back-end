require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let book;

  beforeEach(async() => {
    book = await Book.create({
      title: 'The Test: Before Each',
      author: 'Joel Patrick Durham',
      pages: 5,
      publicationYear: 2019
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should not create a book unless logged in', async() => {
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
          message: 'jwt must be provided', 
          status: 500
        });
      });
  });

  it('can create a book if logged in', async() => {
    const user = await User.create({ email: 'verified@here.com', password: 'garbage' });

    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'verified@here.com', password: 'garbage' });

    return agent
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

  it('can grab all books', async() => {
    return request(app)
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          title: 'The Test: Before Each',
          author: 'Joel Patrick Durham',
          pages: 5,
          publicationYear: 2019,
          shelves: [],
          __v: 0
        }]);
      });
  });

  it('can grab a single book', async() => {
    return request(app)
      .get(`/api/v1/books/${book._id}`)
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

  it('can update a book', async() => {
    return request(app)
      .patch(`/api/v1/books/${book._id}`)
      .send({ pages: 100 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'The Test: Before Each',
          author: 'Joel Patrick Durham',
          pages: 100,
          publicationYear: 2019,
          shelves: [],
          __v: 0
        });
      });
  });

  it('can delete a book', () => {
    return request(app)
      .del(`/api/v1/books/${book._id}`)
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
