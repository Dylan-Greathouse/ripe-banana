const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Reviewer = require('../lib/model/Reviewer.js');

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
      reviewerId: '2',
      review: 'Like Hamlet, but with Lions. It\'s how Shakespeare would have wanted it.',
      filmId: '1',
    },
    {
      rating: 5,
      reviewerId: '3',
      review: 'A masterpiece!',
      filmId: '1',
    },
    {
      rating: 1,
      reviewerId: '4',
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
  const testReviewers = [
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
      company: 'Trader Joe\'s',
    },
  ];
  await Promise.all(
    testReviewers.map(async (arr) => {
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
    await saveReviewers();
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
    await saveReviewers();
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
    const latte = await Reviewer.insert({
      name: 'Latte',
      company: 'Spoiled Oranges',
    });
    return request(app)
      .put(`/api/reviewers/${latte.id}`)
      .send({
        name: 'Latte',
        company: 'Literally anything',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2', 
          name: 'Latte',
          company: 'Spoiled Oranges'
        });
      });
  });

  it('removes reviewers if null value in column reviews', async () => {
    await saveReviewers();
    await saveStudios();
    await saveFilms();
    await saveReviews();

    const res = await request(app)
      .delete('/api/reviewers/1');
    expect (res.body).toEqual({});
  
  });

  afterAll(() => {
    pool.end();
  });
});
