const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        db.fetchObject(`Userbalance_${message.mentions.users.first().id}`).then(l =>{
            db.updateValue(`Userbalance_${message.mentions.users.first().id}`, -l.value)
            db.updateValue(`Userbalance_${message.mentions.users.first().id}`, args[1])
            message.channel.send(`Set **${message.mentions.users.first().username}'s** balance to **${args[1]}**.`)
        })


    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}