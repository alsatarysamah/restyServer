'use strict';
require("dotenv").config();
// Start up DB Server
const { db } = require('./src/models/index.js');
const server= require('./src/server.js');
db.sync()
  .then(() => {

    // Start the web server
   server.startup(process.env.PORT || 3000);
  });

