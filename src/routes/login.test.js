jest.mock('../services/cognito');

import express from 'express';
import loginRoute from './login';
import request from 'supertest';

describe('loginRoute', () => {
  let app, response;

  beforeAll(async () => {
    app = express();
    app.use(express.json())
      .use(loginRoute);
  });

  describe('when there is no password or email', () => {
    beforeAll(async () => {
      response = await request(app).post('/');
    });

    it('returns status code 400', async () => {
      expect(response.status).toEqual(400);
    });

    it('returns error', async () => {
      expect(response.body).toEqual({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
    });
  });

  describe('when there is both password and email', () => {
    beforeAll( async () => {
      response = await request(app).post('/').send({ email: 'email', password: 'password' });
    });

    it('returns status code 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('returns unconfirmed user', async () => {
      expect(response.body).toEqual({
        token: 'RefreshToken',
        user: {
          email: 'email@email.com',
        },
      });
    });
  });
});