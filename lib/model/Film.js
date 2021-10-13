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

  static async selectAll() {
    const { rows } = await pool.query('SELECT id, title, released FROM films');
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
    static async selectId(id) {
      const { rows } = await pool.query(
        `SELECT title, released, studios.id, studios.name
        FROM films
        INNER JOIN studios
        ON films.studio_id = studios.id
        WHERE films.id = $1 `, [id]
      );

      const actors  = await pool.query(
        `SELECT actors.id, name 
        FROM actors
        LEFT JOIN films
        ON films.id = actors.film_id
        WHERE films.id = $1`, [id]
        );


      const reviews = await pool.query(
        `SELECT reviews.id, reviews.rating, reviews.review
        FROM films
        LEFT JOIN reviews
        ON films.id = reviews.film_id
        LEFT JOIN reviewers
        ON reviews.reviewer_id = reviewers.id
        WHERE films.id = $1`, [id]       
      );

      const reviewers = await pool.query(
        `SELECT reviewers.id, reviewers.name
        FROM films
        LEFT JOIN reviews
        ON films.id = reviews.film_id
        LEFT JOIN reviewers
        ON reviews.reviewer_id = reviewers.id
        WHERE films.id = $1`, [id]
      )
  
   let reviewArr = []
   let reviewObj = {}
   reviews.rows.map((row) => {
     reviewObj = {...row}
     reviewers.rows.map((row) => {
       reviewObj['reviewer'] = row
     })
     reviewArr.push(reviewObj)
   })

  return {
    //primary object key
    title: rows[0].title,
    //primary object key
    released: rows[0].released,
    //One studio object within film object
    studio: { id: rows[0].id , name: rows[0].name},
    //array of actors objects within film object
    cast: [...actors.rows ],
    //review array objects with reviewer object nested
    reviews: reviewArr
    }
  } 
}
