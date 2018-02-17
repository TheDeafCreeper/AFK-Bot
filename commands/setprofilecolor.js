const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    const embed = new Discord.RichEmbed()
    if (args[0].toLowerCase() == 'red') {
        args[0] = 'ff0000'
    } else if (args[0].toLowerCase() == 'blue') {
        args[0] = '0600ff'
    } else if (args[0].toLowerCase() == 'green') {
        args[0] = '005c30'
    } else if (args[0].toLowerCase() == 'yellow') {
        args[0] = 'ffff00'
    } else if (args[0].toLowerCase() == 'purple') {
        args[0] = '8100c4'
    } else if (args[0].toLowerCase() == 'white') {
        args[0] = 'ffffff'
    } else if (args[0].toLowerCase() == 'black') {
        args[0] = '000000'
    }
    try {
        embed.setColor(parseInt(`0x${args[0]}`))
        embed.addField('This is your new color!', args[0])
        db.updateText(`Color_${message.author.id}`, `0x${args[0]}`)
        var ran = true
    } catch (err){
        message.channel.send('This is not a valid color! use ??help util if you need help!')
        var ran = false
    }
    if (ran) {
        message.delete(5000)
        message.channel.send(embed).then(msg => {
            msg.delete(5000)
        })
    }
}