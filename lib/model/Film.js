const pool = require('../utils/pool');

module.exports = class Film {
  id;
  title;
  studioId;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.studioId = row.studio_id;
    this.released = row.released;
  }

  static async insert({ title, studioId, released }) {
    const { rows } = await pool.query(
      'INSERT INTO films (title, studio_id, released) VALUES ($1, $2, $3) RETURNING *',
      [title, studioId, released]
    );
    return new Film(rows[0]);
  }

    static async selectAll(){
        const { rows } = await pool.query(
            'SELECT id, title, released FROM films'
        );
        ///inner join studio_id as studio.id
        const studios = await pool.query(
            `SELECT studios.id, name FROM studios
            INNER JOIN films
            ON studios.id = films.studio_id`
        );

        //Initialize arrray
        let filmArr = []
        //Start with object
        let filmObj = {}
        //get film objects
        rows.map((row) => {
            //add film info
            filmObj = {...row}
            //get studio info
            studios.rows.map((row) =>{
                //add studio object to film object
               filmObj['studio'] = row
            })
            //Add new objects to new array
            filmArr.push(filmObj)
        })     
        
        return filmArr
 
    }

    //GET /films/:id
    //initialize object
    //get film object keys
    //add film info to new object
    //get studio object keys (id, name)
    //add studio object onto film object as studio key
    //get all cast members as array of objects
    //add arrray of cast members to film object as cast key
    //get all reviews as array
    //get reviewer object
    //add reviewer object onto reviews
    //add array reviews onto film object
}
 
