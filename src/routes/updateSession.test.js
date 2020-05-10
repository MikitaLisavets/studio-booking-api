jest.mock('../services/cognito');

import express from 'express';
import updateSessionRoute from './updateSession';
import request from 'supertest';
import cookieParser from 'cookie-parser';

describe('loginRoute', () => {
  let app, response;

  beforeAll(async () => {
    app = express();
    app.use(express.json())
      .use(cookieParser())
      .use(updateSessionRoute);
  });

  describe('when there is no refresh token', () => {
    beforeAll(async () => {
      response = await request(app).post('/').set('Cookie', []);
    });

    it('returns status code 401', () => {
      expect(response.status).toEqual(401);
    });

    it('returns error', () => {
      expect(response.body).toEqual({ message: 'Unauthorized error', code: 'unauthorized', statusCode: 401 });
    });
  });

  describe('when there is refresh token', () => {
    beforeAll( async () => {
      response = await request(app).post('/').send({ token: 'RefreshToken' }).set('Cookie', ['token=token']);
    });

    it('returns status code 200', () => {
      expect(response.status).toEqual(200);
    });

    it('returns unconfirmed user', () => {
      expect(response.body).toEqual({
        user: {
          email: 'email@email.com',
        },
      });
    });
  });
});