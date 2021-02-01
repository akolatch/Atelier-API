const express = require('express');
const app = express();
const routes = require('./router.js');
// const morgan = require('morgan');

// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/qa', routes);

app.get('/', (req, res) => {
  res.json('Hello World');
});

module.exports = app;
