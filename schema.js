const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    user: {type: String},
    contest_rating: {type: Number}
  });

module.exports =  userSchema