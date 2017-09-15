'use strict';
const server = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('App server listening on port ' + PORT + '!');
});
