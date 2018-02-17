const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args, start) => {
    try {
        if (args[0] == undefined) {
            message.channel.send('Define a user!');
        } else {
            if (message.mentions.users.first().username.toLowerCase() == message.author.username.toLowerCase()){
                message.channel.send('You can not use this command on yourself!');
            } else {
                db.fetchObject(`reputation_${args[0].toLowerCase()}`).then(o =>{
                    db.updateValue(`reputation_${args[0].toLowerCase()}`, 10).then(l =>{
                        message.channel.send(`You added 10XP to **${args[0].toUpperCase()}**!`)
                        fs.writeFileSync(`./log[${start}].txt`, `\nAdded 10XP to ${message.mentions.users.first().username}`)
                    })
                })
            }
        }
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}