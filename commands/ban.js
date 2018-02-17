const db = require('quick.db');
const discord = require('discord.js');

exports.run = (bot, message, args) => {
    db.fetchObject(`Botrank_${message.author.id}`).then(k => {
        try {
        if (k.text.toLowerCase() == 'admin') {
            ban = message.mentions.users.first()
            args.shift()
            reason = args.join(' ')
            bot.users.get(`${ban.id}`).send(`You have been baned from **${message.guild.name}**.\nReason: ${reason}`)
            GuildMember.get(ban.id).ban()
            message.channel.send(`${ban.username} has been banned from the server by ${message.author.username} for ${reason}`)
        } else {
            message.channel.send('You are not an admin!')
        }
    } catch (err) {
        console.log(err)
    }
})
}