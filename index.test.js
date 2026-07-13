const request = require('supertest');
const app = require('./index');

describe('GET /', () => {
  it('should return 200 and a success message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('CI/CD Pipeline eka wada mcn!');
  });
});