const express = require('express');
const studioController = require('../lib/controller/studios.js');

const app = express();

app.use(express.json());

app.use('/api/studios', studioController);
app.use('/api/films', );

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
