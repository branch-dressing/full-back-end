require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a user with a path', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'joel@joel.com', password: '1234' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'joel@joel.com',
          __v: 0
        });
      });
  });

  it('can login a user', async() => {
    await User.create({
      email: 'test@test.com',
      password: 'monkey'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'monkey'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          __v: 0
        });
      });
  });

  it('throws an error is login with wrong email', async() => {
    await User.create({ email: '123@456.com', password: 'abc' });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: '654@321.moc', password: 'abc' })
      .then(res => expect(res.body).toEqual({
        message: 'Invalid Email/Password',
        status: 401
      }));
  });

  it('throws an error is login with wrong password', async() => {
    await User.create({ email: '123@456.com', password: 'abc' });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: '123@456.com', password: 'cba' })
      .then(res => expect(res.body).toEqual({
        message: 'Invalid Email/Password',
        status: 401
      }));
  });

  it('can verify if a user is logged in', async() => {
    const user = await User.create({ email: 'verified@here.com', password: 'garbage' });

    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'verified@here.com', password: 'garbage' });

    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'verified@here.com',
          __v: 0
        });
      });
  });
});
