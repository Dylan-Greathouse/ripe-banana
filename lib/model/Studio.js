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



  static async selectStudioIdName()
    {
      const { rows } = await pool.query(
        `SELECT id, name
        FROM studios
        RETURNING *`,
      
      )
      return rows.map((row) => new Studio(row))
    }

    static async selectStudioFilm(id) {
        console.log('ID PLeASE', id);
      const { rows } = await pool.query(
    `SELECT studios.id,
    name,
    city,
    state,
    country,
    title,
    films.id AS "film_id"
    FROM studios
    INNER JOIN films
    ON studios.id = films.studio_id
    WHERE studios.id = $1;`,[id]);
      console.log('DA ROWS',rows);
      return new Studio(rows[0]);
    }
};
