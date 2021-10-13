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
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const reviewerPut = await Reviewer.updateReviewer(
        req.params.id,
        req.body
      );
      res.send(reviewerPut);
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
