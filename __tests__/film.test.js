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

describe('banana routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should save a new studio', () => {
    return request(app)
      .post('/api/films')
      .send({
        id: '1',
        title: 'Lion King',
        studio_id: 1,
        released: 1994
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          title: 'Lion King',
          studio_id: 1,
          released: 1994
        });
      });
  });


  afterAll(() => {
    pool.end();
  });
});
