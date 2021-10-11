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

 
  static async remove(id) {
    const { rows } = await pool.query(
      `DELETE FROM reviewers
      USING reviews
      WHERE reviewers.id = reviews.reviewer_id
      AND reviewers.id = $1
      AND reviews IS NULL`, [id]
      )
      return rows[0];
     }
};
