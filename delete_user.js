const mongoose = require("mongoose")
const User = require("./schema")

const delete_user=async (message, args) => {
    const temp = mongoose.model(message.guild.id, User);
    const del = await temp.deleteOne({user: args[0]})
    if(del){
        message.reply("user has been deleted from database")
    }
    else {
        message.reply("user not found in database")
    }
}
module.exports = delete_user;