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

async function saveActors() {
  const testActor = [
    {
      name: 'Leo Fong',
      filmId: '1',
      dob: '11/23/1928',
      pob: 'Xinhui, Jiangmen, Guangdong, China',
    },
    {
      name: 'David Carradine',
      filmId: '1',
      dob: '12/08/1936',
      pob: 'Los Angeles, California, U.S.A.',
    },
    {
      name: 'Robert Zdar',
      filmId: '1',
      dob: '06/03/1950',
      pob: 'Pensacola, Florida, U.S.A.',
    },
  ];
  await Promise.all(
    testActor.map(async (arr) => {
      await request(app).post('/api/actors').send(arr);
    })
  );
}

async function saveFilms() {
  const testFilm = [
    {
      title: 'Lion King',
      studioId: '1',
      released: 1994,
    },
    {
      title: 'Babe',
      studioId: '1',
      released: 1991,
    },
    {
      title: 'Babe II Pig in the City',
      studioId: '1',
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

  it('should save a new actor', async () => {
    await saveStudios();
    await saveFilms();
    await saveActors();
    return request(app)
      .post('/api/actors')
      .send({
        name: 'Cameron Mitchell',
        filmId: '1',
        dob: '11/04/1918',
        pob: 'Dallastown, Pennsylvania, U.S.A.',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '4',
          name: 'Cameron Mitchell',
          filmId: '1',
          dob: '11/04/1918',
          pob: 'Dallastown, Pennsylvania, U.S.A.',
        });
      });
  });

  it('should return all studios names and ideeess', async () => {
    await saveStudios();
    await saveFilms();
    await saveActors();
    return request(app)
      .get('/api/actors')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            name: expect.any(String),
          },
          {
            id: '2',
            name: expect.any(String),
          },
          {
            id: '3',
            name: expect.any(String),
          },
        ]);
      });
  });

  it('should return a actor with all films and titles', async () => {
    await saveStudios();
    await saveFilms();
    await saveActors();
    return request(app)
      .get('/api/actors/1')
      .then((res) => {
        // console.log('AT GET STUDIO FILM AND TITLE TEST', res.body);
        expect(res.body).toEqual({ 
          name: expect.any(String),
          pob: expect.any(String),
          dob: expect.any(String),
          films : [{
            
            released: expect.any(String),
            title: expect.any(String),
          },
          {
            released: expect.any(String),
            title: expect.any(String),
          },
          {
            released: expect.any(String),
            title: expect.any(String),
          },
          ]
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
