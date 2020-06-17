import app from './app';
import request from 'supertest';

describe('App', () => {
  it('returns app status', async () => {
    const res = await request(app).get('/status');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('OK');
  });
});