jest.mock('../services/cognito');

import express from 'express';
import updateSessionRoute from './updateSession';
import request from 'supertest';

describe('loginRoute', () => {
  let app, response;

  beforeAll(async () => {
    app = express();
    app.use(express.json())
      .use(updateSessionRoute);
  });

  describe('when there is no refresh token', () => {
    beforeAll(async () => {
      response = await request(app).post('/');
    });

    it('returns status code 400', () => {
      expect(response.status).toEqual(400);
    });

    it('returns error', () => {
      expect(response.body).toEqual({ message: 'errorMessage', code: 'errorCode', statusCode: 400 });
    });
  });

  describe('when there is refresh token', () => {
    beforeAll( async () => {
      response = await request(app).post('/').send({ token: 'RefreshToken' });
    });

    it('returns status code 200', () => {
      expect(response.status).toEqual(200);
    });

    it('returns unconfirmed user', () => {
      expect(response.body).toEqual({
        token: 'RefreshToken',
        user: {
          email: 'email@email.com',
        },
      });
    });
  });
});