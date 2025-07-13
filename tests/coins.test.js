const request = require('supertest');
const app = require('../server');

describe('Coins API', () => {
  let createdCoinId;

  it('GET /coins should return JSON array', async () => {
    const res = await request(app).get('/coins');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /coins should create a new coin', async () => {
    const newCoin = {
      type: 'TestType',
      country: 'TestCountry',
      year: 2023,
      denomination: '1 TestCoin',
      mint_mark: 'A',
      material: 'Gold',
      grade: 'MS-70',
    };

    const res = await request(app)
      .post('/coins')
      .field('type', newCoin.type)
      .field('country', newCoin.country)
      .field('year', newCoin.year)
      .field('denomination', newCoin.denomination)
      .field('mint_mark', newCoin.mint_mark)
      .field('material', newCoin.material)
      .field('grade', newCoin.grade);
      // Test upload img:
      // .attach('image', 'tests/sample.jpg');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdCoinId = res.body.id;
  });

  it('PUT /coins/:id should update a coin', async () => {
    const updatedCoin = {
      type: 'UpdatedType',
      country: 'UpdatedCountry',
      year: 2024,
      denomination: '2 UpdatedCoin',
      mint_mark: 'B',
      material: 'Silver',
      grade: 'MS-65',
    };

    const res = await request(app)
      .put(`/coins/${createdCoinId}`)
      .field('type', updatedCoin.type)
      .field('country', updatedCoin.country)
      .field('year', updatedCoin.year)
      .field('denomination', updatedCoin.denomination)
      .field('mint_mark', updatedCoin.mint_mark)
      .field('material', updatedCoin.material)
      .field('grade', updatedCoin.grade);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Coin updated');
  });

  it('DELETE /coins/:id should delete a coin', async () => {
    const res = await request(app).delete(`/coins/${createdCoinId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Coin deleted');
  });
});
