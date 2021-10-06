const pool = require('../utils/pool');

//     name: <name-of-studio RS>,
//     city: <city S>
//     state: <state S>
//     country: <country S>

module.exports = class Studio {
  id;
  name;
  city;
  state;
  country;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }

  static async insert({ name, city, state, country }) {
    const { rows } = await pool.query(
      'INSERT INTO studios (name, city, state, country) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, city, state, country]
    );

    return new Studio(rows[0]);
  }



  static async selectStudioIdName() {
      const { rows } = await pool.query(
        `SELECT id, name
        FROM studios
        RETURNING *`,
      
      )
      return rows.map((row) => new Studio(row))
    }

  static async selectStudioFilm(id) {
      const { rows } = await pool.query(
        'SELECT * FROM studios WHERE id = $1',
         [id]
        );
      const response = await pool.query(
        'SELECT id, title FROM films WHERE studio_id = $1',
         [id]
      );
      const studioRow = new Studio(rows[0]);
      return { ...studioRow, films: response.rows } 
    } 
    // use double join and data munge through films data
};
