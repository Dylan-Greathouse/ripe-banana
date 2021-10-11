const pool = require('../utils/pool');

module.exports = class Reviewer {
  id;
  name;
  company;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      'INSERT INTO reviewers (name, company) VALUES ($1, $2) RETURNING *',
      [name, company]
    );

    return new Reviewer(rows[0]);
  }

  static async getAllReviewers() {
    const { rows } = await pool.query(
      'SELECT id, name, company FROM reviewers'
    );

    return rows.map((row) => new Reviewer(row));
  }

  static async getReviewerById(id) {
    const { rows } = await pool.query(
      `SELECT id, name, company
      FROM reviewers
      WHERE id = $1`,
      [id]
    );

    const reviews = await pool.query(
      `SELECT reviews.id, reviews.rating, reviews.review
      FROM reviewers
      LEFT JOIN reviews
      ON reviewers.id = reviews.reviewer_id
      LEFT JOIN films
      ON reviews.film_id = films.id
      WHERE reviewers.id = $1`,
      [id]
    );

    const movies = await pool.query(
      `SELECT title, id
    FROM films
    WHERE films.id = $1 `,
      [id]
    );

    let reviewArr = [];
    let reviewObj = {};
    reviews.rows.map((row) => {
      reviewObj = { ...row };
      movies.rows.map((row) => {
        reviewObj['film'] = row;
      });
      reviewArr.push(reviewObj);
    });

    return {
      id: rows[0].id,
      name: rows[0].name,
      company: rows[0].company,
      reviews: reviewArr,
    };
  }
};
