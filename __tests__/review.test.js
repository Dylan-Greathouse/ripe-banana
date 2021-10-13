const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
async function saveStudios() {
  const testStudio = [
    {
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

async function saveFilms() {
  const testFilm = [
    {
      title: 'Lion King',
      studioId: 1,
      released: 1994,
    },
    {
      title: 'Babe',
      studioId: 1,
      released: 1991,
    },
    {
      title: 'Babe II Pig in the City',
      studioId: 1,
      released: 1992,
    },
  ];
  await Promise.all(
    testFilm.map(async (arr) => {
      await request(app).post('/api/films').send(arr);
    })
  );
}

async function saveReviewers() {
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

async function saveReviews() {
  const testReview = [
    {
      rating: 5,
      reviewerId: '1',
      review: 'Like Hamlet, but with Lions. It\'s how Shakespeare would have wanted it.',
      filmId: '1',
    },
    {
      rating: 5,
      reviewerId: '2',
      review: 'A masterpiece!',
      filmId: '1',
    },
    {
      rating: 1,
      reviewerId: '3',
      review: 'Lions can\'t talk.',
      filmId: '1',
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

  it('should save a new review', async () => {
    await saveStudios();
    await saveFilms();
    await saveReviewers();
    return request(app)
      .post('/api/reviews')
      .send({
        rating: 3,
        reviewerId: '2',
        review: 'Meh.',
        filmId: '1',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          rating: 3,
          reviewerId: '2',
          review: 'Meh.',
          filmId: '1',
        });
      });
  });

  it('it gets all reviews orders by the 100 highest rated', async ()  => {
    await saveStudios();
    await saveReviewers();
    await saveFilms();
    await saveReviews();

    return request(app)
      .get('/api/reviews')
      .then((res) => {
        expect(res.body).toEqual([{ 
          id: expect.any(String),
          rating: 5,
          review: expect.any(String),
          film:{
            id: expect.any(String),
            title: expect.any(String)
          }
        }, {  
          id: expect.any(String),
          rating: 5,
          review: expect.any(String),
          film:{
            id: expect.any(String),
            title: expect.any(String)
          }
        }, {  
          id: expect.any(String),
          rating: 1,
          review: expect.any(String),
          film:{
            id: expect.any(String),
            title: expect.any(String)
          }
        },
        ]);
      });
  });
  
  it('removes reviews', async () => {
    await saveStudios();
    await saveFilms();
    await saveReviewers();
    await saveReviews();

    const res = await request(app)
      .delete('/api/reviews/1');
    expect (res.body).toEqual({});
  
  });

  afterAll(() => {
    pool.end();
  });
});
