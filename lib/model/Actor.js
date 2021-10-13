const pool = require('../utils/pool');

module.exports = class Actor {
  id;
  name;
  filmId;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.filmId = row.film_id;
    this.dob = row.dob;
    this.pob = row.pob;
  }

  static async insert({ name, filmId, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO actors (name, film_id, dob, pob) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, filmId, dob, pob]
    );
    return new Actor(rows[0]);
  }

  static async selectActorIdName() {
    const { rows } = await pool.query(
      `SELECT id, name
      FROM actors`,
    
    )
    return rows.map((row) => new Actor(row))
  }

  static async selectActorFilm(id) {

    const { rows } = await pool.query(
      `SELECT name, dob, pob FROM actors
      INNER JOIN films
      ON actors.film_id = films.id
      WHERE actors.id = $1`,
       [id]
      );
    const response = await pool.query(
      'SELECT title, released FROM films'
    );
    const actorRow = new Actor(rows[0]);
    return { ...actorRow, films: response.rows } 
  } 

  //GET /actors
  //get array of all actors id, names
  //return map of array

  //GET /actors/:id
  //initialize new actor object
  //get actor object keys
  //add actor info to new object
  //get all films as array of objects
  //add array(films) to actor object
  //return total actor object
};
