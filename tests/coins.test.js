const request = require('supertest');
const app = require('../server');

describe('Coins API', () => {
  let coinId;

  it('should create a new coin', async () => {
    const res = await request(app).post('/coins').field('type', 'test').field('country', 'Italy').field('year', 2023).field('denomination', '1 Euro');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    coinId = res.body.id;
  });

  it('should get all coins', async () => {
    const res = await request(app).get('/coins');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a coin', async () => {
    const res = await request(app).put(`/coins/${coinId}`).field('type', 'updated').field('country', 'France').field('year', 2024).field('denomination', '2 Euro');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Coin updated');
  });

  it('should delete the coin', async () => {
    const res = await request(app).delete(`/coins/${coinId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Coin deleted');
  });
});
