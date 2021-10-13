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
      `SELECT reviews.id, rating, review, films.id
      FROM reviews
      INNER JOIN films
      ON reviews.film_id = films.id
      ORDER BY rating DESC`
    );

    const films = await pool.query(
      `SELECT films.id, title FROM films`
    )

    let reviewObj = {}
    let reviewArr = []
    
      rows.map((row) => {
        reviewObj = {...row}
        films.rows.map((row) => {
          reviewObj['film'] = row
        })
        reviewArr.push(reviewObj)
      })
    

 return reviewArr
  }
 
 static async remove(id) {
   const { rows } = await pool.query(
     'DELETE FROM reviews WHERE id = $1', [id]
     )
     return rows[0];
    }
    
}
