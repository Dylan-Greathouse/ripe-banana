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

async function saveReviews() {
  const testReview = [
    {
      rating: '5',
      reviewerId: '1',
      review:
        'Like Hamlet, but with Lions. It\'s how Shakespeare would have wanted it.',
      filmId: '1',
    },
    {
      rating: '5',
      reviewerId: '2',
      review: 'A masterpiece!',
      filmId: '1',
    },
    {
      rating: '1',
      reviewerId: '3',
      review: 'Lions can\'t talk.',
      filmId: '1',
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

  it('should return a reviewer by id', async () => {
    await saveStudios();
    await saveFilms();
    await saveReviewer();
    await saveReviews();

    return request(app)
      .get('/api/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          company: expect.any(String),
          reviews: [
            {
              id: expect.any(String),
              rating: expect.any(Number),
              review: expect.any(String),
              film: {
                id: expect.any(String),
                title: expect.any(String),
              },
            },
          ],
        });
      });
  });

  it('should update a reviewer', async () => {
    await saveReviewer();
    return request(app)
      .patch('/api/reviewers/1')
      .send({
        id: 1,
        name: 'Latt\xE8',
        company: 'Spoiled Oranges',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Latt\xE8',
          company: 'Spoiled Oranges',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
