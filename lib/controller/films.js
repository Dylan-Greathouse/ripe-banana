const { Router } = require('express');
const Film = require('../model/Film');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const savedFilm = await Film.insert(req.body);
      res.json(savedFilm);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const films = await Film.selectAll();
      res.json(films);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const film = await Film.selectId(req.params.id);
      res.json(film);
    } catch (err) {
      next(err);
    }
  });
