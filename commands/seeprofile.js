const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {

        if (args[0] == undefined) {
            var user = message.author.id
        } else {
            var user = message.mentions.users.first().id
        }
            db.fetchObject(`userLevel_${user}`).then(e => {
                db.fetchObject(`reputation_${user}`).then(o => {
                    db.fetchObject(`topUser_${message.guild.id}`).then(j => {
                        db.fetchObject(user).then(n => {
                            db.fetchObject(`Userbalance_${user}`).then(l => {
                                db.fetchObject(`AFK_${user}${message.guild.id}`).then(afkuser => {
                                    db.fetchObject(`Botrank_${user}`).then(k => {
                                        db.fetchObject(`Sendpurchase_${message.guild.id}`).then(owner => {
                                            db.fetchObject(`Color_${user}`).then(color => {
                                                const embed = new Discord.RichEmbed()
                                                    .setColor(parseInt(color.text))
                                                if (args[0] == undefined) {
                                                    embed.setDescription(`The user profile of **${message.author.username}**`)
                                                } else {
                                                    embed.setDescription(`The user profile of **${message.mentions.users.first().username}**`)
                                                }
                                                var xp = n.value + o.value;
                                                var level = e.value;
                                                var bal = l.value;
                                                if (k.text.length < 1) {
                                                    db.updateText(`Botrank_${user}`, 'User')
                                                }
                                                if (j.text == user) {
                                                    embed.addField(`-----------------`, `**They are the top user!**`)
                                                }
                                                if (owner.text == user) {
                                                    embed.addField(`-----------------`, `**They are the shop owner!**`)
                                                }
                                                if (afkuser.value > 0) {
                                                    embed.addField(message.author.username + ' is AFK', `Reason: ${afkuser.text}`)
                                                }
                                                embed.addField(`**Rank:**`, `**${k.text}**`)
                                                embed.addField('**Level:**', `**${level}**`)
                                                embed.addField('**XP:**', `**${xp}/${(Math.ceil(Math.pow(e.value + 1, 3) * .1)) + e.value}**`)
                                                embed.addField('**Balance:**', `**$${bal}**`)
                                                message.channel.send({ embed })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}