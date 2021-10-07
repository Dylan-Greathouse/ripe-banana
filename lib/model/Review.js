const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  reviewerId;
  review;
  filmId;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.reviewerId = row.reviewer_id;
    this.review = row.review;
    this.filmId = row.film_id;
  }

  static async insert({ rating, reviewerId, review, filmId }) {
    const { rows } = await pool.query(
      'INSERT INTO reviews (rating, reviewer_id, review, film_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [rating, reviewerId, review, filmId]
    );
    return new Review(rows[0]);
  }
};
