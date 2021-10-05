const { Router } = require('express');
const Studio = require('../model/Studio');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const savedStudio = await Studio.insert(req.body);
      res.json(savedStudio);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) =>
  {
    try
    {
      const getStudios = await Studio.selectStudioIdName();
      res.json(getStudios);
    }
    catch(err)
    {
      next(err);
    }
  });

