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
  });
