const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        var seconds = Math.floor(bot.uptime / 1000)
        var minutes = Math.floor(bot.uptime / 60000)
        var hours = Math.floor(seconds / 3600)
        var days = Math.floor(hours/24)
        seconds = (seconds - (60 * minutes))
        minutes = (minutes - (60 * hours))
        if (args[0] != undefined) {
            if (args[0].toLowerCase() == 'ms') {
                message.channel.send(`${days} Days : ${Math.floor(hours)} Hours : ${Math.floor(minutes)} Minutes : ${Math.floor(seconds)} Seconds : ${Math.round(bot.uptime)} Total Milliseconds`)
            } else {
                message.channel.send(`${days} Days : ${Math.floor(hours)} Hours : ${Math.floor(minutes)} Minutes : ${Math.floor(seconds)} Seconds`)
            }
        } else {
            message.channel.send(`${days} Days : ${Math.floor(hours)} Hours : ${Math.floor(minutes)} Minutes : ${Math.floor(seconds)} Seconds`)
        }


    } catch (err) {
        console.log(err);
        console.log('Error running command "uptime".')
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}