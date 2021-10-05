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
}