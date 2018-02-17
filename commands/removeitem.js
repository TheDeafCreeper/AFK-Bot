const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    var ran = false
    db.fetchObject(`Sendpurchase_${message.guild.id}`).then(l => {
        if (message.author.id == l.text) {
            db.fetchArray(`Shop_${message.guild.id}`).then(shop => {
                db.fetchArray(`Price_${message.guild.id}`).then(price => {
                    shop[0] = ''
                    for (i = 0; i < shop.length; i++) {
                        if (shop[i].toLowerCase() == args[0].toLowerCase()) {
                            shop.splice(i, 1)
                            price.splice(i, 1)
                            ran = true
                            break;
                        }
                    }
                    if (ran) {
                        message.channel.send(`Removed **${args[0]}** from the shop.`).then(msg => {
                            msg.delete(3000)
                        })
                    } else {
                        message.channel.send(`Could not find ${args[0]} in the shop.`).then(msg => {
                            msg.delete(3000)
                        })
                    }
                    db.setArray(`Shop_${message.guild.id}`, shop)
                    db.setArray(`Price_${message.guild.id}`, price)
                })
            })
        }
    })
}