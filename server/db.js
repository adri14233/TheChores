const mongoose = require('mongoose');
const SECURE = require('./SECURE.js');

mongoose.connect(
  'mongodb://' + SECURE.MONGO_DB + '/' + SECURE.DB_NAME,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(`😞 Sorry, something went wrong! ${err}`); // eslint-disable-line no-console
    } else {
      console.log(`🦆 Database (the_chores_project) connected @ port 3001!`); // eslint-disable-line no-console
    }
  }
);

module.exports = mongoose;