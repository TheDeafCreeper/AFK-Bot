const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args, start) => {
    db.fetchObject(`Sendpurchase_${message.guild.id}`).then(l => {
        if (0 == l.value) {
            db.updateText(`Sendpurchase_${message.guild.id}`, message.author.id)
            message.channel.send(`**${message.author.username}** you are now the shop owner.`)
            fs.writeFileSync(`./log[${start}].txt`, `Changed the shop owner of ${message.guild.name} to ${message.author.username}`)
        } else {
            message.channel.send('Owner changing is off!')
        }
    })

}