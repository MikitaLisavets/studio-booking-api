jest.mock('../services/cognito');

import express from 'express';
import listUsersRoute from './listUsers';
import request from 'supertest';

describe('listUsersRoute', () => {
  let app, response;

  beforeAll(async () => {
    app = express();
    app.use(express.json())
      .use(listUsersRoute);
    response = await request(app).post('/');
  });

  it('returns status code 200', () => {
    expect(response.status).toEqual(200);
  });

  it('returns list of users', () => {
    expect(response.body).toEqual([{ UserName: 'email@email.com' }]);
  });
});