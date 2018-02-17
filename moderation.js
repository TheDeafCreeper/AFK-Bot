const db = require('quick.db');
const Discord = require('discord.js');
var isAdmin;
exports.run = (bot, message, args) => {
    db.fetchArray(`Admins_${message.guild.id}`).then(admins => {
        db.fetchObject(`lastsend_${message.author.id}2`).then(seen => {
            for (i = 0; i < admins.length; i++) {
                if (admins[i] == message.author.id) {
                    isAdmin = true
                    break;
                } else {
                    isAdmin = false
                }
            }
            if (isAdmin) return;
            console.log(message.createdTimestamp - seen.value)
            if (message.createdTimestamp - seen.value <= 600) {
                db.updateValue(`warnings_${message.author.id}`, 1)
            } else if (message.createdTimestamp - seen.value >= 3000) {
                db.fetchObject(`warnings_${message.author.id}`).then(warn => {
                    db.updateValue(`warnings_${message.author.id}`, -warn.value)
                })
            }
            db.updateValue(`lastsend_${message.author.id}2`, -seen.value)
            db.updateValue(`lastsend_${message.author.id}2`, message.createdTimestamp)

            db.fetchObject(`warnings_${message.author.id}`).then(warn => {
                if (warn.value >= 3) {
                    db.updateValue(`warnings_${message.author.id}`, -warn.value)
                    message.channel.send('Woah there, slow down a bit!')
                    db.updateValue(`violations_${message.author.id}`, 1)
                }
            })
            if (message.createdTimestamp - seen.value <= 5000) {
                db.fetchObject(`violations_${message.author.id}`).then(vio => {
                    if (vio.value > 2) {
                        message.channel.send(`**${message.author.username}** you have been **MUTED** for spam!`)
                        message.member.addRole.name('Muted', 'Auto mod violations')
                    }
                })
            } else if (message.createdTimestamp - seen.value >= 10000) {
                db.fetchObject(`violations_${message.author.id}`).then(vio => {
                    db.updateValue(`violations_${message.author.id}`, -vio.value)
                })
            }

        })
    })
}