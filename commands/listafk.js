const db = require('quick.db');
const Discord = require('discord.js');
const fs = require('fs')
exports.run = (bot, message, args, start) => {

    try {
        db.fetchArray(`AFKusers_${message.guild.id}`).then(afk => {
            db.fetchArray(`AFKreasons_${message.guild.id}`).then(rea => {
                for (i = afk.length; i > 0; i--) {
                    if (afk[i] == undefined) {
                        afk.splice(i, 1)
                        rea.splice(i, 1)
                    }
                }
                const embed = new Discord.RichEmbed()
                for (i = 1; i < afk.length; i++) {
                    embed.addField(`${afk[i]} is **AFK**, **Reason:**`, rea[i])
                }
                embed.setDescription(`**Afk users on ${message.guild.name}**`)
                embed.setColor(0x81cdf3)
                message.channel.send(embed)
            })
        })
    } catch (err) {
        console.log(err);
        console.log('Error running command "listafk".')
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}