const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveReviews() {
  const testReview = [
    {
      id: '1',
      rating: '5',
      reviewer_id: '1',
      review: `Like Hamlet, but with Lions. It's how Shakespeare would have wanted it.`,
      film_id: '1',
    },
    {
      id: '2',
      rating: '5',
      reviewer_id: '2',
      review: 'A masterpiece!',
      film_id: '1',
    },
    {
      id: '3',
      rating: '1',
      reviewer_id: '3',
      review: `Lions can't talk.`,
      film_id: '1',
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

  it('should save a new review', async () => {
    await saveReviews();
    return request(app)
      .post('/api/reviews')
      .send({
        rating: '3',
        reviewerId: '4',
        review: 'Meh.',
        filmId: '1',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '4',
          rating: '3',
          reviewerId: '4',
          review: 'Meh.',
          filmId: '1',
        });
      });
  });
  afterAll(() => {
    pool.end();
  });
});
