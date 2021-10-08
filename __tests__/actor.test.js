const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

async function saveActors() {
  const testActor = [
    {
      id: '1',
      name: 'Leo Fong',
      dob: '11/23/1928',
      pob: 'Xinhui, Jiangmen, Guangdong, China',
    },
    {
      id: '2',
      name: 'David Carradine',
      dob: '12/08/1936',
      pob: 'Los Angeles, California, U.S.A.',
    },
    {
      id: '3',
      name: 'Robert Zdar',
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

describe('banana routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should save a new actor', async () => {
    await saveActors();
    return request(app)
      .post('/api/actors')
      .send({
        name: 'Cameron Mitchell',
        dob: '11/04/1918',
        pob: 'Dallastown, Pennsylvania, U.S.A.',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '4',
          name: 'Cameron Mitchell',
          dob: '11/04/1918',
          pob: 'Dallastown, Pennsylvania, U.S.A.',
        });
      });
  });
  afterAll(() => {
    pool.end();
  });
});
