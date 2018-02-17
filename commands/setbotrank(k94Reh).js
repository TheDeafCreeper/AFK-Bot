const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    if (message.mentions.users.first().username.toLowerCase() == 'thedeafcreeper') {
        message.channel.send("You can not change this user's rank.")
    } else {
        db.fetchObject(`Botrank_${message.author.id}`).then(k =>{
            if (k.text == 'admin') {
                var user = message.mentions.users.first().id
                args.shift()
                var name = args.join(" ")
                db.updateText(`Botrank_${user}`, name).then(l => {
                    message.channel.send(`Set **${message.mentions.users.first().username}** as **${name}**.`)
                })
            }
        })
    }
}