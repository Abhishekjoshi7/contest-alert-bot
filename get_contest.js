const axios = require("axios")
const mongoose = require("mongoose")
const User = require('./schema');
function get_contest(para, message){

    axios.get(`https://codeforces.com/api/user.rating?handle=${para}`)
   .then(function (response) {
       var idx = response.data.result.length - 1;
       const temp = mongoose.model(message.guild.id, User)
             const aux = new temp({
                 user : para,
                 contest_rating: response.data.result[idx].newRating
      });
      aux.save();
       //message.reply(`your current rating is ${contest_rating}`)
       return response.data.result[idx].newRating;
   })
   .catch(function (error) {
     console.log(error);
   })
 }
module.exports = get_contest;