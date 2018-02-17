const db = require('quick.db');
const Discord = require('discord.js')
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        /*db.fetchArray(`todo_${message.guild.id}`).then(d => {
            const embed = new Discord.RichEmbed()
                .setColor(0x79bff5)
            d[0] = '';
            var o = 0
            for (var i = 1; i < d.length; i++) {
                if (d[i].length > 0) {
                    embed.addField(`**${o + 1}:**`, `**${d[i]}**`)
                    o++
                }
            }
            embed.setDescription(`***${message.guild.name}'s*** **TODO** list :: Items Found: **${o}**`)
            message.channel.send(embed)
            if (args.length > 0) {
                message.channel.send('You have arguments on here, did you mean to do *??addtodo* or *??removetodo*?')
            }
        }) */
    } catch (err) {
        console.log(err);
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
    message.channel.send('This command was replaced with ??list, do ??lists to see a list of lists, and ??list to create a list!')
}