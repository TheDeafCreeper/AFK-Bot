const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        db.fetchObject(args[0]).then(i => {
            console.log(i)
            if (i.text.length > 0) {
                message.channel.send('Their MC name is ' + i.text);
            } else {
                message.channel.send('This user has not set their name yet.')
            }

        })
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}