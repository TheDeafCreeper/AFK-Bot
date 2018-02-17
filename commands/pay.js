const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    var error2 = 'no'
    db.fetchObject(`Userbalance_${message.author.id}`).then(b => {
        var arg1 = args[1]
        if (args[1] == undefined) {
            message.channel.send('Define an amount to send!');
            return;
        } 
        if (b.value < args[1]) {
            message.channel.send('Transaction failed, You dont have enough money!')
            return;
        } else if (isNaN(arg1)) {
            message.channel.send(`Transaction failed **${args[1]}** is not a number`)
        }
        else {
            try {
                db.updateValue(`Userbalance_${message.author.id}`,-Math.abs(args[1]))
                db.updateValue(`Userbalance_${message.mentions.users.first().id}`,Math.abs(args[1]))
            } catch (err) {
                console.log(err)
                error2 = 'yes'
            } finally {
                if (error2 != 'no') {
                    message.channel.send('Transaction failed, an error occured. Are you sure you typed a number?')
                } else {
                    message.channel.send(`Successfully transfered **$${Math.abs(args[1])}** to ${args[0]}`)
                }
            }
        }
    })
}