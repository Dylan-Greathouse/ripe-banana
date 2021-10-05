const { Router } = require('express');
const Film = require('../model/Films');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const savedFilm = await Film.insert(req.body);
    res.json(savedFilm);
  } catch (error) {
    next(error);
  }
});
