const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    db.fetchObject(`Botrank_${message.author.id}`).then(k =>{
        if (k.text == 'admin') {
            let arg0 = message.mentions.users.first().id
            db.fetchObject(`userLevel_${arg0}`).then(l =>{
                db.fetchObject(`reputation_${arg0}`).then(i => {
                    db.updateValue(`userLevel_${arg0}`,-l.value)
                    db.updateValue(`userLevel_${arg0}`,Math.abs(args[1])).then(p =>{
                        message.channel.send(`${message.mentions.users.first().username} has been set to level ${Math.abs(Math.round(args[1]))}`)
                    })
                    db.fetchObject(message.mentions.users.first().id + message.guild.id).then(h => {
                        db.updateValue(message.mentions.users.first().id + message.guild.id,-h.value)
                        db.updateValue(`reputation_${arg0}`,-i.value)
                        db.updateValue(`reputation_${arg0}`,(Math.abs(Math.round(Math.pow(args[1]-1,3)*.1))+Math.round(args[1])))
                        db.fetchObject(`topUser_${message.guild.id}`).then(b => {
                            if (b.text.toLowerCase() == message.mentions.users.first().username.toLowerCase()) {
                                db.updateText(`topUser_${message.guild.id}`,'Currently undefined.')
                                db.updateValue(`topUser_${message.guild.id}`, -b.value)
                            }
                        })
                    })
                })
            })
        }
    })
}