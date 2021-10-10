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

  //GET /reviews
  static async select() {
    const { rows } = await pool.query(
      `SELECT reviews.id, rating, review, films.id, title 
      FROM reviews
      INNER JOIN films
      ON reviews.film_id = films.id
      ORDER BY rating DESC`
    );
    console.log('AT REVIEWS SELECT ALL', rows);
    return [
      {
        id: rows.id,
        rating: rows.rating,
        review: rows.review,
        film: 'fuck if I know',
      },
    ];
  }
  //SQL ORDER BY rating DESC?
  //initialize new array
  //initialize new review object
  //get review objects
  //add review info
  //get film info
  //add film object to review object
  //add new review objects to new array
  //return
};
