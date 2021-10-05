const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveStudios() {
  const testStudio = [
    {
      id: '1',
      name: 'Blum House',
      city: 'Hollywood',
      state: 'California',
      country: 'United States of America',
    },
  ];
  await Promise.all(
    testStudio.map(async (arr) => {
      await request(app).post('/api/studios').send(arr);
    })
  );
}

describe('banana routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should save a new studio', () => {
    return request(app)
      .post('/api/studios')
      .send({
        id: '1',
        name: 'Blum House',
        city: 'Hollywood',
        state: 'California',
        country: 'United States of America',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: 'Blum House',
          city: 'Hollywood',
          state: 'California',
          country: 'United States of America',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
