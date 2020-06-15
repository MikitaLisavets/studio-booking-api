jest.mock('../services/cognito');

import express from 'express';
import logoutRoute from './logout';
import request from 'supertest';

describe('logoutRoute', () => {
  let app, response;

  beforeAll(async () => {
    app = express();
    app.use(express.json())
      .use(logoutRoute);

    response = await request(app).post('/');
  });

  it('returns status code 200', () => {
    expect(response.status).toEqual(200);
  });

  it('returns success response', () => {
    expect(response.body).toEqual({ success: true });
  });
});