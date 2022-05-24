const get_contest = require("./get_contest").default
const mongoose = require("mongoose")
const User = require('./schema');
const add_new_user =async (message, args) => {
    const temp = mongoose.model(message.guild.id, User)
            let existingUser = await temp.findOne({user: args[0]})
            if(existingUser) {
                console.log(existingUser)
                message.reply("User is already registered in out database")
            }
            else 
           {
               console.log(existingUser)
               get_contest(args[0], message)
               //message.reply(`${args[0]} has been added to the database`)
            }
}

module.exports = add_new_user;