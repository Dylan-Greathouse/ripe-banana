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

  //GET /reviewer
  //get array of reviewers id, name, company
  //return map of array

  //GET /reviewer/:id
  //initialize new reviewer object
  //get reviewer object keys
  //add info to new reviewer object
  //get all reviews as an array of objects
  //add array(reviews:) onto new reviewer object
  //return total new reviewer object
};
