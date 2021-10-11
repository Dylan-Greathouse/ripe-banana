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
async function saveReviewers() {
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

  it('removes reviewers if null valum in column reviews', async () => {
    await saveStudios();
    await saveFilms();
    await saveReviewers();
    await saveReviews();

    const res = await request(app)
      .delete('/api/reviewers/1');
    expect (res.body).toEqual({});
  
  });

  afterAll(() => {
    pool.end();
  });
});
