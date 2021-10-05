const pool = require('../utils/pool');

module.exports = class Film
{
    id;
    title;
    studioId;
    released;

    constructor(row)
    {
        this.id = row.film_id;
        this.title = row.title;
        this.studioId = row.studio_id
        this.released = row.released;
    }

    static async insert({title, studioId, released})
    {
        console.log('AT FILM INSERT', title, studioId, released)
        const { rows } = await pool.query(
        'INSERT INTO films (title, studio_id, released) VALUES ($1, $2, $3) RETURNING *',
        [title, studioId, released]
        );
        return new Film(rows[0]);
    }

    static async selectAll()
    {
        const { rows } = await pool.query(
            'SELECT * FROM films'
        )
        return rows.map((row) => new Film(row))
    }
}
 
