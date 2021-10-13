const { Router } = require('express');
const Review = require('../model/Review');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const savedReview = await Review.insert(req.body);
      res.json(savedReview);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const getReviews = await Review.select();
      res.json(getReviews);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const removeReview = await Review.remove(req.params.id);
      res.send(removeReview);
    } catch(err) {
      next(err);
    }
  });
 
