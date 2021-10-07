const express = require('express');
const studioController = require('../lib/controller/studios.js');
const filmController = require('../lib/controller/films.js');
const actorController = require('../lib/controller/actors.js');
const reviewerController = require('../lib/controller/reviewers.js');

const app = express();

app.use(express.json());

app.use('/api/studios', studioController);
app.use('/api/films', filmController);
app.use('/api/actors', actorController);
app.use('/api/reviewers', reviewerController);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
