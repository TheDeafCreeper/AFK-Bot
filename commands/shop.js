const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        const embed = new Discord.RichEmbed()
            .setColor(0x81cdf3)
        db.fetchArray(`Shop_${message.guild.id}`).then(shop => {
            db.fetchArray(`Price_${message.guild.id}`).then(price => {
                shop[0] = ''
                for (i = 1; i < shop.length; i++) {
                    embed.addField(`Item: **${shop[i]}**`, `Price: **$${price[i]}**`)
                }
                embed.setDescription(`**${message.guild.name}'s** shop:`)
                message.channel.send(embed)
            })
        })
    } catch (err) {
        console.log(err)
    }
}