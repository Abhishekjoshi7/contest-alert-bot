const axios = require("axios");
const secondsToDhms = require("./converter")
const { MessageEmbed } = require("discord.js");
const auto_contest=(message)=>{
    var res ="->";
    axios.get('https://codeforces.com/api/contest.list')
            .then(function (response) {
                console.log(response.data.result[0]);
                let result = ""
                for(let i = 0; i < 5; i++)
                        {
                            if(response.data.result[i].phase === 'BEFORE') {
                                var temp = -1*response.data.result[i].relativeTimeSeconds
                                var timing = secondsToDhms(temp)
                                res = res +  `\`${response.data.result[i].name} will start int \`${timing}\` from now\`` + "\n\n"
                                
                            }
                        }
                embed = new MessageEmbed()
                .setTitle("Constests")
                .setDescription(`${res}`)
                .setColor("BLURPLE")
                .setURL(`https://codeforces.com/contests`)

                message.channel.send({ embeds: [embed] });
            })
        
}
module.exports = auto_contest;