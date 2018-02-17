const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args, start) => {
    try {
        db.updateValue(`Userbalance_${message.mentions.users.first().id}`, args[1])
        message.channel.send(`Added **$${args[1]}** to **${message.mentions.users.first().username}'s balance**.`)
        fs.writeFileSync(`./log[${start}].txt`, `\n${message.author.username} added $${args[1]} to ${message.mentions.users.first().username}'s balance`)
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}