const db = require('quick.db');
const Discord = require('discord.js');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        const embed = new Discord.RichEmbed()
            .setColor(0x79bff5)
        if (message.mentions.users.first()) {
            db.fetchObject(`lastsend_${message.mentions.users.first().id}`).then(last => {
                var seconds = Math.floor((message.createdTimestamp - last.value) / 600)
                var minutes = Math.floor(seconds / 60)
                var hours = Math.floor(minutes / 60)
                var days = Math.floor(hours / 24)
                seconds = (seconds - (60 * minutes))
                minutes = (minutes - (60 * hours))
                hours = (hours - (24 * days))
                embed.addField(`${message.mentions.users.first().username} last sent a message:`, `${days}D:${hours}H:${minutes}M:${seconds}S ago`)
                message.channel.send(embed)
            })
        }
    } catch (err) {
        console.log(err)
    }
}