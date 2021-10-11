const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveReviewer() {
  const testReview = [
    {
      name: 'Latte',
      company: 'Spoiled Oranges',
    },
    {
      name: 'KiKi',
      company: 'Anywhere but Google',
    },
    {
      name: 'The Proffesor',
      company: "Trader Joe's",
    },
  ];
  await Promise.all(
    testReview.map(async (arr) => {
      await request(app).post('/api/reviewers').send(arr);
    })
  );
}

describe('banana routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should save a new reviewer', async () => {
    return request(app)
      .post('/api/reviewers')
      .send({
        name: 'Latte',
        company: 'Spoiled Oranges',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: 'Latte',
          company: 'Spoiled Oranges',
        });
      });
  });

  it('should return all reviewers', async () => {
    await saveReviewer();
    return request(app)
      .get('/api/reviewers')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            name: expect.any(String),
            company: expect.any(String),
          },
          {
            id: '2',
            name: expect.any(String),
            company: expect.any(String),
          },
          {
            id: '3',
            name: expect.any(String),
            company: expect.any(String),
          },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
