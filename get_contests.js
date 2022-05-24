const axios = require("axios")
const secondsToDhms = require("./converter")
const {MessageEmbed} = require ('discord.js')
const get_contests = (message) => {
    axios.get('https://codeforces.com/api/contest.list')
    .then(function (response) {
        console.log(response.data.result[0]);
        let result = ""
        for(let i = 0; i < 5; i++)
        {
            if(response.data.result[i].phase === 'BEFORE') {
                var temp = -1*response.data.result[i].relativeTimeSeconds
                var timing = secondsToDhms(temp)
                result = result + `${response.data.result[i].name} will start in \`${timing}\`` +"\n"+"\n"
            }
        }
        embed = new MessageEmbed()
        .setTitle("Constests")
        .setDescription(`${result}`)
        .setColor("BLURPLE")
        .setURL(`https://codeforces.com/contests`)

        message.channel.send({ embeds: [embed] });
    })
}

module.exports = get_contests;