const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args, start) => {
    try {
        db.fetchObject(`Userbalance_${message.author.id}${message.guild.id}`).then(l => {
            db.fetchArray(`Shop_${message.guild.id}`).then(shop => {
                db.fetchArray(`Price_${message.guild.id}`).then(price => {
                    shop[0] = ''
                    for (i = 1; i < shop.length; i++) {
                        if (shop[i].toLowerCase() == args[0].toLowerCase()) {
                            if (l.value >= price[i]) {
                                db.updateValue(`Userbalance_${message.author.id}${message.guild.id}`, -price[i])
                                message.channel.send(`You have successfully bought ${args[0]} for $${price[i]}! You should recive your purchase soon!`)
                                db.fetchObject(`Sendpurchase_${message.guild.id}`).then(owner => {
                                    bot.users.get(`${owner.text}`).send(`**${message.author.username}** bought **${shop[i]}** for **${price[i]}**`)
                                    fs.writeFileSync(`./log[${start}].txt`, `\n${message.author.username} bought ${shop[i]} on ${message.guild.name}'s shop for the price of ${price[i]}.`)
                                })
                                break;
                            } else {
                                message.channel.send(`You dont have enough money! ${l.value}/${price}`)
                            }
                        }
                    }
                })
            })
        })
    } catch (err) {
        console.log(err)
    }
}