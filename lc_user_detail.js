const axios = require("axios")
const {MessageEmbed} = require ('discord.js')
const lc_user_detail= (message, args) => {
    axios.get(`https://leetcode-stats-api.herokuapp.com/${args[1]}`)
            .then(function (response) {
                console.log(response)
                 const embed = new MessageEmbed()
                 .setTitle(`${args[1]} leetcode`)
                 .setDescription(`

                 \`${response.data.totalSolved}\` total problems solved

                 \`${response.data.easySolved}\` easy problems solved

                 \`${response.data.mediumSolved}\` medium problems solved

                 \`${response.data.hardSolved}\` hard problems solved
                
                 \`${response.data.acceptanceRate}\` acceptance rate

                 \`${response.data.ranking}\` ranking

                 \`${response.data.reputation}\` reaputation


                 ` )
                 .setColor("DARK_RED")
                 .setURL(`https://leetcode.com/${args[1]}`)
                message.channel.send({ embeds: [embed] });
                console.log(message.guild.name)
                console.log(response.data.result);
            })
            .catch(function (error) {
                message.reply('User does not exists')
                console.log(error);
             })
}
module.exports = lc_user_detail;