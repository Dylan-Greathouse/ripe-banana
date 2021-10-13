const request = require('supertest');
const app = require('../libs/app.js');

// module.exports = class Utils{

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

async function saveReviews() {
  const testReview = [
    {
      rating: '5',
      reviewer_id: '1',
      review:
        "Like Hamlet, but with Lions. It's how Shakespeare would have wanted it.",
      film_id: '1',
    },
    {
      rating: '5',
      reviewer_id: '2',
      review: 'A masterpiece!',
      film_id: '1',
    },
    {
      rating: '1',
      reviewer_id: '3',
      review: "Lions can't talk.",
      film_id: '1',
    },
  ];
  await Promise.all(
    testReview.map(async (arr) => {
      await request(app).post('/api/reviews').send(arr);
    })
  );
}

async function saveReviewer() {
  const testReview = [
    {
      id: '1',
      name: 'Latte',
      company: 'Spoiled Oranges',
    },
    {
      id: '2',
      name: 'KiKi',
      company: 'Anywhere but Google',
    },
    {
      id: '3',
      name: 'The Proffesor',
      company: "Trader Joe's",
    },
  ];
  await Promise.all(
    testReview.map(async (arr) => {
      await request(app).post('/api/reviews').send(arr);
    })
  );
}

module.exports = {
  saveStudios,
  saveFilms,
  saveActors,
  saveReviews,
  saveReviewer,
};
// };
