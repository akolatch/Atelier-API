const express = require('express');
const app = express();
const routes = require('./router.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/qa', routes);

app.get('/', (req, res) => {
  res.json('Hello World');
});

module.exports = app;
