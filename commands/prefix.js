const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        db.fetchObject(`Prefix_${message.guild.id}`).then(i => {
            db.updateText(`Prefix_${message.guild.id}`,args[0]).then(o => {
                message.channel.send(`Changed prefix from ${i.text} to ${args[0]}.`)
            })
        })
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}