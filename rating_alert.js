const axios = require("axios")
const { Guild } = require("discord.js")
const mongoose = require("mongoose")
const add_new_user = require("./add_new_user")
const User = require("./schema")
const {MessageEmbed} = require("discord.js")


const rating_alert= async(message)=>{
    const temp = mongoose.model(message.guild.id, User)
    const users = await temp.find()
    console.log(users);
    let msg = "";
    
    const rating_changes = (user_name) => {
        axios.get(`https://codeforces.com/api/user.rating?handle=${user_name}`)
            .then(function (response) {
                console.log(response);
                var len = response.data.result.length - 1
                return response.data.result[len].newRating;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    timedCheck = setInterval(() =>{
        for(var i = 0; i < users.length; i++){
            const check = rating_changes(users[i].user);
            if(check === users[0].contest_rating) continue;
            else
            {
                msg = msg + check + "\n\n"
                dalete_user(users[i].user)
                add_new_user(users[i].user)
            } 
        }
        embed = new MessageEmbed()
        .setTitle("Rating Changes")
        .setDescription(`${result}`)
        .setColor("BLURPLE")
        .setURL(`https://codeforces.com/contests`)

        message.channel.send({ embeds: [embed] });
        }, 1000*24*60*60);

}
module.exports = rating_alert;