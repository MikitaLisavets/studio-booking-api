jest.mock('../services/cognito');

import express from 'express';
import signUpRoute from './signUp';
import request from 'supertest';

describe('signUpRoute', () => {
  let app, response;

  beforeAll(() => {
    app = express();
    app.use(express.json())
      .use(signUpRoute);
  });

  describe('when there is no password or email', () => {
    beforeAll(async () => {
      response = await request(app).post('/');
    });

    it('returns status code 500', async () => {
      expect(response.status).toEqual(500);
    });

    it('returns error', async () => {
      expect(response.body).toEqual({ message: 'errorMessage', code: 'errorCode' });
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
      expect(response.body).toEqual({ UserConfirmed: false });
    });
  });
});