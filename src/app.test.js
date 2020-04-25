import app from './app';
import request from 'supertest';

describe('App', () => {
  it('returns sample text', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Test response');
  });
});