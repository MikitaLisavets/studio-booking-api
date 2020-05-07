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

  describe('when there is no confirmation code or email', () => {
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

  describe('when there is both confirmation code and email', () => {
    beforeAll( async () => {
      response = await request(app).post('/').send({ email: 'email', confirmationCode: '12345678' });
    });

    it('returns status code 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('returns unconfirmed user', async () => {
      expect(response.body).toEqual({ success: true });
    });
  });
});