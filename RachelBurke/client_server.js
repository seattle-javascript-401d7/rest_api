const express = require('express');
const app = express();

module.exports = exports = app.use(express.static(__dirname + '/build'))
  .listen(5000, () => console.log('server up'));
