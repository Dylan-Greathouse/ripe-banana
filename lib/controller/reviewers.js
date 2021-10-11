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

  .get('/', async (req, res, next) => {
    try {
      const getReviewers = await Reviewer.getAllReviewers();
      res.send(getReviewers);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.getReviewerById(req.params.id);
      res.send(reviewer);
    } catch (error) {
      next(error);
    }
  });
