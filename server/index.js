'use strict';
const server = require('./app');
const db = require('../db');
const PORT = process.env.port || 3000;


server.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
