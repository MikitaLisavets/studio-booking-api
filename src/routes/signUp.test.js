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

  describe('when there is no password or email or phoneNumber', () => {
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

  describe('when password and email and phoneNumber exist', () => {
    beforeAll( async () => {
      response = await request(app).post('/').send({ email: 'email', password: 'password', phoneNumber: '+123456789' });
    });

    it('returns status code 200', () => {
      expect(response.status).toEqual(200);
    });

    it('returns unconfirmed user', () => {
      expect(response.body).toEqual({ UserConfirmed: false });
    });
  });
});