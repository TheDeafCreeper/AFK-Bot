const db = require('quick.db');
const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x79bff5)
    embed.setDescription(`Lists in  **${message.guild.name}**`)
    db.fetchArray(`lists_${message.guild.id}`).then(array => {
        if (array.length > 1) {
            console.log(array.length)
            for (i = 1; i < array.length; i++) {
                embed.addField(`**${i}**`, `**${array[i]}**`)
            }
            message.channel.send(embed)
        } else {
            message.channel.send(`**${message.guild.name}** has no lists!`)
        }
    })
}