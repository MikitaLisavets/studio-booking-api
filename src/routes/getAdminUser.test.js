jest.mock('../services/cognito');

import express from 'express';
import getAdminUserRoute from './getAdminUser';
import request from 'supertest';

describe('getAdminUserRoute', () => {
  let app, response;

  beforeAll(() => {
    app = express();
    app.use(express.json())
      .use(getAdminUserRoute);
  });

  describe('when there is no email', () => {
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

  describe('when there is email', () => {
    beforeAll( async () => {
      response = await request(app).post('/').send({ email: 'email' });
    });

    it('returns status code 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('returns unconfirmed user', async () => {
      expect(response.body).toEqual({ UserStatus: 'CONFIRMED' });
    });
  });
});