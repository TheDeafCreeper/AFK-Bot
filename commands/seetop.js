const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        db.fetchObject(`topUser_${message.guild.id}`).then(j =>{
            message.channel.send(`The top user is ${j.text} at level **${j.value}**.`)
        })
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}