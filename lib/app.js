const express = require('express');
const studioController = require('../lib/controller/studios.js');
const filmController = require('../lib/controller/films.js');

const app = express();

app.use(express.json());

app.use('/api/studios', studioController);
app.use('/api/films', filmController);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
