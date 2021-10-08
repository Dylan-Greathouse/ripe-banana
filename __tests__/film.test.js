const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveFilms() {
  const testFilm = [{
    title: 'Lion King',
    studioId: 1,
    released: 1994
  }, {
    title: 'Babe',
    studioId: 1,
    released: 1991,
  }, {
    title: 'Babe II Pig in the City',
    studioId: 1,
    released: 1992,
  }
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


  it('gets all films and their associated studio id, name', async() => {
    await saveStudios();
    await saveFilms();
    return request(app)
      .get('/api/films')
      .then((res) => {
        expect(res.body).toEqual([{
          id: '1',
          title: expect.any(String),
          released: expect.any(String),
          studio: { id: '1', name: expect.any(String) }
        }, {
          id: '2',
          title: expect.any(String),
          released: expect.any(String),
          studio: { id: '1', name: expect.any(String) }
        }, {
          id: '3',
          title: expect.any(String),
          released: expect.any(String),
          studio: { id: '1', name: expect.any(String) }
        }]);
      });
  });

  it('gets film by id with studio, cats, and reviews', async() => {
    await saveStudios();
    await saveFilms();
  });


  afterAll(() => {
    pool.end();
  });
});
