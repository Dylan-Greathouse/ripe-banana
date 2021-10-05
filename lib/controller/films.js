const { Router } = require('express');
const Film = require('../model/Film');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    // console.log('AT FILM CONTROLLER', req.body);
    const savedFilm = await Film.insert(req.body);
    res.json(savedFilm);
  } catch (error) {
    next(error);
  }
});
