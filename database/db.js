const mongoose = require("mongoose");
const keys = require("../config/keys");
const db = mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(docs => {
    console.log("Connected to db");
  })
  .catch(e => {
    console.log(e);
  });
mongoose.Promise = global.Promise;

module.exports = { db };
