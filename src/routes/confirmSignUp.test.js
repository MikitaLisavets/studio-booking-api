jest.mock('../services/cognito');

import express from 'express';
import confirmSignUpRoute from './confirmSignUp';
import request from 'supertest';

describe('confirmSignUpRoute', () => {
  let app, response;

  beforeAll(() => {
    app = express();
    app.use(express.json())
      .use(confirmSignUpRoute);
  });

  describe('when there is no confirmation code or email or password', () => {
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

  describe('when confirmation code and email and password are exist', () => {
    beforeAll( async () => {
      response = await request(app).post('/').send({ email: 'email', password: 'password', confirmationCode: '12345678' });
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