const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveReviewers() {
  const testReview = [
    {
      name: 'Latte',
      company: 'Spoiled Oranges'
    },
    {
      name: 'KiKi',
      company: 'Anywhere but Google'
    },
    {
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

async function saveReviews() {
  const testReview = [
    {
      rating: '5',
      reviewer_id: '1',
      review: 'Like Hamlet, but with Lions. It\'s how Shakespeare would have wanted it.',
      film_id: '1',
    },
    {
      rating: '5',
      reviewer_id: '2',
      review: 'A masterpiece!',
      film_id: '1',
    },
    {
      rating: '1',
      reviewer_id: '3',
      review: 'Lions can\'t talk.',
      film_id: '1',
    }
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

  it.skip('should save a new review', async () => {

    await saveReviewers();
    return request(app)
      .post('/api/reviews')
      .send({
        rating: '3',
        reviewerId: '2',
        review: 'Meh.',
        filmId: '1',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '4',
          rating: '2',
          reviewerId: '4',
          review: 'Meh.',
          filmId: '1',
        });
      });
  });

  it('it gets all reviews orders by the 100 highest rated', async ()  => {
    await saveReviewers();
    await saveReviews();

    return request(app)
      .get('/api/reviews')
      .then((res) => {
        expect(res.body).toEqual([
          { id: expect.any(String),
            rating: expect.any(String),
            review: expect.any(String),
            film:{
              id: expect.any(String),
              title: expect.any(String)
            }
          }
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
