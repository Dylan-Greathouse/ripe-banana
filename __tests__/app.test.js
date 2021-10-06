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

  ///---GET STUDIO ID & NAME---///
  it('should return all studios names and ideeess', async () => {
    await saveStudios();
    return request(app)
      .get('/api/studios')
      .then((res) => {
        // console.log('AT GET STUDIO NAME AND ID TEST', res.body);
        expect(res.body).toEqual([
          {
            id: '1',
            name: 'Blum House',
          },
        ]);
      });
  });

  it.only('should return a studio with all films and titles', async () => {
    await saveStudios();
    await saveFilms();
    return request(app)
      .get('/api/studios/1')
      .then((res) => {
        // console.log('AT GET STUDIO FILM AND TITLE TEST', res.body);
        expect(res.body).toEqual({
          id: '1',
          name: 'Blum House',
          city: 'Hollywood',
          state: 'California',
          country: 'United States of America',
          films: [
            { id: '1', title: expect.any(String) },
            { id: '2', title: expect.any(String) },
            { id: '3', title: expect.any(String) },
          ],
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
