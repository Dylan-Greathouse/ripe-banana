const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveFilms() {
  const testFilm = [
    {
      id: '1',
      title: 'Lion King',
      studio_id: 1,
      released: 1994
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

  it('should save a new film', async () => {
    await saveStudios();
    return request(app)
      .post('/api/films')
      .send({
        title: 'Lion King',
        studioId: 1,
        released: 1994
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          title: 'Lion King',
          studioId: '1',
          released: '1994'
        });
      });
  });


  afterAll(() => {
    pool.end();
  });
});
