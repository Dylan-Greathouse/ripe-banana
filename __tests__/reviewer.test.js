const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');




describe('banana routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it.skip('should save a new reviewer', async () => {
    return request(app)
      .post('/api/reviewers')
      .send({ })
      .then((res) => {
        expect(res.body).toEqual({ });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
