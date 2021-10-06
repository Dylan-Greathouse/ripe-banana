const pool = require('../utils/pool');

module.exports = class Film {
    id;
    title;
    studioId;
    released;

    constructor(row){
        this.id = row.id;
        this.title = row.title;
        this.studioId = row.studio_id
        this.released = row.released;
    }

    static async insert({title, studioId, released}){
        const { rows } = await pool.query(
        'INSERT INTO films (title, studio_id, released) VALUES ($1, $2, $3) RETURNING *',
        [title, studioId, released]
        );
        return new Film(rows[0]);
    }

    static async selectAll(){
        const { rows } = await pool.query(
            'SELECT * FROM films'
        )
        const studios  = await pool.query(
            'SELECT id, name FROM studios'
        )
        const studioObj = studios.rows.map((row) => new Film(row))
        // const filmOBj = rows.map(() => new Film(rows))
        // console.log('AT SELECT ALL FILM MODEL', studioObj[1])
        return{...rows, studio: studioObj}
    }

    
}
 
