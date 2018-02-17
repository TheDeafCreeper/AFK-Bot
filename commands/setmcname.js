const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        db.updateText(message.author.username,args.join(' ')).then(i => {
            message.channel.send('I set your MC name as ' + i.text)
            console.log(i.text)
        })
    } catch (err) {
        console.log(err);
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }

}