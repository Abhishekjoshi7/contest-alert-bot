require("dotenv").config();
const { Client }= require('discord.js')
const axios = require('axios')
const express = require('express');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const mongoose = require('mongoose');
const User = require('./schema');
const app = express()
const get_contests = require("./get_contests")
const add_new_user = require("./add_new_user")
const get_user_detail = require("./get_user_detail")
const auto_contest = require("./auto_contest")
const rating_alert = require("./rating_alert")
const delete_user = require("./delete_user")
const {MessageEmbed} = require("discord.js")
client.login(process.env.DISCORDJS_BOT_TOKEN)

mongoose
  .connect(
    `mongodb+srv://wayward_blu:${process.env.PASSWORD}@cluster0.lbi98.mongodb.net/discord_bot?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
});

const PREFIX = "IIITA-"
client.on('ready', () => {
    console.log(client.user.tag + ' had logged in')
})


client.on('messageCreate', async (message) =>
{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/)
        if(CMD_NAME === 'user') {
            get_user_detail(message, args)
        }
        else if(CMD_NAME === 'contest'){
           get_contests(message)
        }
        else if(CMD_NAME === 'turn_on_auto_contest_alert') {
            auto_contest(message)
        }
        else if(CMD_NAME === "add"){
            add_new_user(message, args)
        }
        else if(CMD_NAME === "remove"){
            delete_user(message, args)
        }
        else if(CMD_NAME === "turn_on_rating_alert") {
            rating_alert(message)
        }
        else if(CMD_NAME === "help") {
            embed = new MessageEmbed()
            .setTitle("Help guide")
            .setDescription(
                `
                 \`IIITA-user {user_name}\` --user detail

                 \`IIITA-contest\` --contest detail

                 \`IIITA-turn_on_auto_contest_alert\` --24 hour contest alerts

                 \`IIITA-add {user_name}\` --add user to database to get alert message on rating changes
                
                 \`IIITA-remove {username}\` --remove user from database

                 \`IIITA-turn_on_rating_alert\` will start the rating alert for user names in database
            `)
            .setColor("BLURPLE")
            
            message.channel.send({ embeds: [embed] });

        }
        else {
            message.reply("/`INVALID COMMAND/`")
        }
    }
    
})


