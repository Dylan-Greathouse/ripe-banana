const { Router } = require('express');
const Actor = require('../model/Actor');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const savedActor = await Actor.insert(req.body);
      res.json(savedActor);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try
    {
      const getActors = await Actor.selectActorIdName();
      res.json(getActors);
    }
    catch(err)
    {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try
    {
      const getActor = await Actor.selectActorFilm(req.params.id);
      res.send(getActor);
    }
    catch(err)
    {
      next(err);
    }
  });
