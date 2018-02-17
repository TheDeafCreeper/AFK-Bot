const db = require('quick.db');
const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    const embed = new Discord.RichEmbed()
        .setColor(0x79bff5)
        if (args[0] == undefined) {
            message.channel.send('Please do create, add, view, or remove.')
        } else if (args[0].toLowerCase() == 'create') {
        args.shift()
        var title = args[0]
        args.shift()
        db.fetchArray(`${title}${message.guild.id}`).then(check => {
            if (check[0] != 'exists') {
                db.setArray(`${title}${message.guild.id}`, ['exists'])
                message.channel.send(`Created the channel **${title}**! Add items with ??list add ${title} item!`).then(msg => {
                    msg.delete(6000)
                })
                console.log(`${message.author.name} created ${title}`)
                db.fetchArray(`lists_${message.guild.id}`).then(lists => {
                    lists.push(title)
                    db.setArray(`lists_${message.guild.id}`, lists)
                })
            } else {
                message.channel.send('This list already exists!').then(msg => {
                    msg.delete(3000)
                })
            }
        })
    } else if (args[0].toLowerCase() == 'add') {
        args.shift()
        var title = args[0]
        args.shift()
        db.fetchArray(`${title}${message.guild.id}`).then(array => {
            if (array[0] == 'exists') {
                array.push(args.join(' '))
                message.channel.send(`Added **${args.join(' ')}** to the list **${title}**`).then(msg => {
                    msg.delete(3000)
                })
                console.log(`${message.author.username} added ${args.join(' ')} to ${title}`)
            } else {
                message.channel.send('This list does not exist! Use ??list create name to make a list or ??lists to view all lists!!')
            }
            db.setArray(`${title}${message.guild.id}`, array)
        })
    } else if (args[0].toLowerCase() == 'remove') {
        args.shift()
        var title = args[0]
        args.shift()
        db.fetchArray(`${title}${message.guild.id}`).then(array => {
            if (array[0] == 'exists') {
                for (i = 1; i < array.length; i++) {
                    if (array[i].toLowerCase() == args.join(' ').toLowerCase()) {
                        array.splice(i, 1)
                        message.channel.send(`Removed **${args.join(' ')}** from the list.`).then(msg => {
                            msg.delete(3000)
                        })
                        console.log(`${message.author.name} removed ${args.join(' ')} from ${title}`)
                        db.setArray(`${title}${message.guild.id}`, array)
                    }
                }
            } else {
                message.channel.send(`Could not find that list, use ??lists to see all lists!`)
            }
        })
    } else if (args[0].toLowerCase() == 'delete') {
        args.shift()
        var title = args[0]
        args.shift()
        db.fetchArray(`${title}${message.guild.id}`).then(array => {
            if (array[0] == 'exists') {
                array = []
                message.channel.send(`Deleted the list ${title}`).then(msg => {
                    msg.delete(3000)
                })
                console.log(`${message.author.name} deleted ${title}`)
                db.setArray(`${title}${message.guild.id}`, array)
                db.fetchArray(`lists_${message.guild.id}`).then(lists => {
                    console.log(lists)
                    for (i = 0; i < lists.length; i++) {
                        if (lists[i].toLowerCase() == title.toLowerCase()) {
                            lists.splice(i, 1)
                            db.setArray(`lists_${message.guild.id}`, lists)
                        }
                    }
                })
            } else {
                message.channel.send(`Could not find that list, use ??lists to see all lists!`)
            }
        })
    } else if (args[0].toLowerCase() == 'view') {
        var page = 1
        args.shift()
        var title = args[0]
        args.shift()
        if (args[0] != undefined) {
        page = args[0]
        args.shift()
        }
        if (title.length == 0) {
            message.channel.send('Select a list, use ??lists for a list of lists!')
        } else {
            db.fetchArray(`${title}${message.guild.id}`).then(array => {
                embed.setDescription(`Items in **${title}** on server **${message.guild.name}**\nItems found : ${array.length - 1}`)
                for (i = 10 * (page - 1) + 1; i < array.length && i <= 10 * page; i++) {
                    embed.addField(`${i})`, `**${array[i]}**`)
                }
                /*
                
                for (i = 1 * page; i < array.length && i <= 10 * page; i++) {
                    embed.addField(`**${i + 10 * (page - 1)})**`, `**${array[i]}**`)
                }
                
                */
               embed.setFooter(`Page ${page}/${Math.ceil((array.length/10) - 1)}`)
               message.channel.send(embed)
            })
        }
    } else {
        message.channel.send('Please do ??list create, add, view, or remove.')
    }
}
