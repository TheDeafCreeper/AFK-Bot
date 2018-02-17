const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    db.fetchObject(`Sendpurchase_${message.guild.id}`).then(l => {
        try {
            if (message.author.id == l.text) {
                if (l.value == 0) {
                db.updateValue(`Sendpurchase_${message.guild.id}`, 1)

                message.channel.send('Owner changing is now off.')
                }
                if (l.value > 0) {
                    db.updateValue(`Sendpurchase_${message.guild.id}`, -l.value)
                    message.channel.send('Owner changing is now on.')
                }
            }
        } catch (err) {

        }
    })
}