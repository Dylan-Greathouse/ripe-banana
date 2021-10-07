const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveReviewer() {
  const testReview = [
    {
      id: '1',
      name: 'Latte',
      company: 'Spoiled Oranges'
    },
    {
      id: '2',
      name: 'KiKi',
      company: 'Anywhere but Google'
    },
    {
      id: '3',
      name: 'The Proffesor',
      company: 'Trader Joe\'s'
    },
  ];
  await Promise.all(
    testReview.map(async (arr) => {
      await request(app).post('/api/reviews').send(arr);
    })
  );
}

describe('banana routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it.skip('should save a new reviewer', async () => {
    return request(app)
      .post('/api/reviewers')
      .send({ 
        name: 'Latte',
        company: 'Spoiled Oranges'
      })
      .then((res) => {
        expect(res.body).toEqual({ });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
