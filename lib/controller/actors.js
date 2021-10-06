const { Router } = require('express');
const Actor = require('../model/Actor');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const savedActor = await Actor.insert(req.body);
    res.json(savedActor);
  } catch (error) {
    next(error);
  }
});
