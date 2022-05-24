const axios = require("axios")
const {MessageEmbed} = require ('discord.js')
const get_user_detail= (message, args) => {
    axios.get(`https://codeforces.com/api/user.info?handles=${args[0]}`)
            .then(function (response) {
                 const embed = new MessageEmbed()
                 .setTitle(`${args[0]}`)
                 .setImage(`${response.data.result[0].avatar}`)
                 .setDescription(`

                 \`${response.data.result[0].contribution}\` contributions found

                 \`${response.data.result[0].rating}\` is current rating

                 \`${response.data.result[0].maxRating}\` is max rating

                 \`${response.data.result[0].rank}\` is current rank
                
                 \`${response.data.result[0].maxRank}\` is max rank

                 has \`${response.data.result[0].friendOfCount}\` friends

                 ` )
                 .setColor("DARK_RED")
                 .setURL(`https://codeforces.com/profile/${args[0]}`)
                message.channel.send({ embeds: [embed] });
                console.log(message.guild.name)
                console.log(response.data.result);
            })
            .catch(function (error) {
                message.reply('User does not exists')
                console.log(error);
            })
}
module.exports = get_user_detail;