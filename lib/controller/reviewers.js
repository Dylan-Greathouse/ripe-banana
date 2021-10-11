const { Router } = require('express');
const Reviewer = require('../model/Reviewer');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const saveReviewer = await Reviewer.insert(req.body);
      res.json(saveReviewer);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const removeReview = await Reviewer.remove(req.params.id);
      res.send(removeReview);
    } catch(err) {
      next(err);
    }
  });
