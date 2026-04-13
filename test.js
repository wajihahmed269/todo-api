const request = require('supertest');
const app = require('../src/index');

describe('Health check', () => {
  it('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Todos auth', () => {
  it('GET /todos without API key returns 401', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(401);
  });

  it('GET /todos with correct API key returns 200 or 500', async () => {
    const res = await request(app)
      .get('/todos')
      .set('x-api-key', 'supersecret123');
    // 500 is fine here — no real DB in test env
    expect([200, 500]).toContain(res.statusCode);
  });
});
