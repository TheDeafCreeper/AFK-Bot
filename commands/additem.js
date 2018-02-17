const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args, start) => {
    db.fetchObject(`Sendpurchase_${message.guild.id}`).then(l => {
        if (message.author.id == l.text) {
            db.fetchArray(`Shop_${message.guild.id}`).then(shop => {
                db.fetchArray(`Price_${message.guild.id}`).then(price => {
                    shop[0] = ''
                    if (args[1] != NaN) {
                        shop.push(args[0])
                        price.push(args[1])
                        message.channel.send(`Added ${args[0]} to the shop for the price ${args[1]}`).then(msg => {
                            msg.delete(3000)
                        })
                        fs.writeFileSync(`./log[${start}].txt`, `\nAdded ${args[0]} to the shop of ${message.guild.name} for the price ${args[1]}`)
                    } else {
                        message.channel.send('Please define a price!').then(msg => {
                            msg.delete(3000)
                        })
                    }
                    console.log(shop)
                    db.setArray(`Shop_${message.guild.id}`, shop)
                    db.setArray(`Price_${message.guild.id}`, price)
                })
            })
        }
    })
}