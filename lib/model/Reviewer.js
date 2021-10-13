const reviewers = require('../controller/reviewers');
const reviews = require('../controller/reviews');
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
  const { rows } = await pool.query(`
  SELECT reviewers.id, name, company, review 
  FROM reviewers
  LEFT JOIN reviews
  ON reviewers.id = reviews.reviewer_id
  WHERE reviewers.id = $1`, [id]
  )
  console.log('AT REMOVE IN REVIEWER MODEL', rows[0])

  if(rows[0].review !== null ){

  const  reviewer = await pool.query(
    'DELETE FROM reviewers WHERE id = $1', [id]
  )
  return new Reviewer(reviewer.rows[0])}
}

};
