const axios = require("axios")
const auto_contest=(message)=>{
    axios.get('https://codeforces.com/api/contest.list')
            .then(function (response) {
                console.log(response.data.result[0]);
                if (!timedCheck){
                    timedCheck = setInterval(() =>{
                        for(let i = 0; i < 5; i++)
                        {
                            if(response.data.result[i].phase === 'BEFORE') {
                                var temp = -1*response.data.result[i].relativeTimeSeconds
                                var timing = secondsToDhms(temp)
                                var res =  `\`${response.data.result[i].name} will start int \`${timing}\` from now\``
                                message.reply(res)
                            }
                        }
                        }, 1000*24*60*60);
                        message.reply('command started!');
                } else {
                    message.reply(`command already running!`)
                }
            })
}
module.exports = auto_contest;