const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db');
const config = require('./config.json');
const fs = require('fs')
var prefix = '??';
const start = Date.now()
bot.login(config.token)

//Bot ready
bot.on('ready', () => {
    console.log('ready');
    bot.user.setGame(`??Help | In ${bot.guilds.array().length} servers!`)
    fs.writeFileSync(`./log[${start}].txt`, `--------------${start}----------------`)
})
bot.on('warn', console.warn);
bot.on('error', console.error);
bot.on('disconnect', () => console.log('Disconnected'));
bot.on('reconnecting', () => console.log('Reconnecting'));
bot.on('message', message => {
    if (message.guild == null) return;
    if (message.author.bot) return;
    
//lastmessagesent
    db.fetchObject(`lastsend_${message.author.id}`).then(last => {
        db.updateValue(`lastsend_${message.author.id}`, -last.value)
        db.updateValue(`lastsend_${message.author.id}`, message.createdTimestamp)
    })
//remove afk
    try {
        db.fetchArray(`AFKusers_${message.guild.id}`).then(afk => {
            db.fetchArray(`AFKreasons_${message.guild.id}`).then(rea => {
                afk[0] = ''
                for (i = 0; i < afk.length; i++) {
                    if (afk[i].toLowerCase() == message.author.username.toLowerCase()) {
                        if (!message.content.toLowerCase().startsWith(`${prefix}afk`)) {
                            afk.splice(i, 1)
                            rea.splice(i, 1)
                            //fs.writeFileSync(`\n./log[${start}].txt`, `\nRemoved the AFK of ${message.author.username} on server ${message.guild.name}`)
                            message.channel.send(`Welcome back **${message.author.username}**, I have removed your **AFK**!`).then(msg => {
                                msg.delete(3000)
                            })
                            break;
                        }
                    }
                }
                db.setArray(`AFKusers_${message.guild.id}`, afk)
                db.setArray(`AFKreasons_${message.guild.id}`, rea)
            })
        })
        
    } catch (err) {
        console.log(err);
        console.log('Error when checking for afk user sending a message.');
    }
//make sure server has prefix
    try {
        var ob = (message.guild.id)
        db.fetchObject(`Prefix_${message.guild.id}`).then(i => {
            if (i.text.length == 0) {
                db.updateText(`Prefix_${message.guild.id}`, '??').then(o => {
                    console.log(`Set ${message.guild.id}'s prefix to ??`)
                    prefix = '??';
                })
            } else {
                prefix = i.text;
            }
        })
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems there has been an error, please report it to TheDeafCreeper!')
    }
//handler
        if (message.author.bot) return;
        let msg = message.content.toUpperCase();
        let sender = message.author;
        let args = message.content.slice(prefix.length).trim().split(" ");
        let cmd = args.shift().toLowerCase();
        //let commandFilemod = require(`./moderation.js`);
        //commandFilemod.run(bot, message, args);
    if (message.content.startsWith(prefix)) {
        try {
            let commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(bot, message, args, start);
        } catch (err) {
            console.log(err.message);
            message.channel.send(`Sorry, "${cmd}" is not a working command. To see a list of all commands, use ??help.`)
        } finally {
            console.log(`${sender.username} ran the command: ${cmd} with arguments: ${args}`)
            fs.writeFileSync(`./log[${start}].txt`, `\n${sender.username} ran the command: ${cmd} with arguments: ${args}`)
        }
    } else if (message.content.toLowerCase().startsWith('a?')) {
        let msg = message.content.toUpperCase();
        let sender = message.author;
        let args = message.content.slice(prefix.length).trim().split(" ");
        let cmd = args.shift().toLowerCase();
        if (message.author.bot) return;

        try {
            db.fetchObject(`Botrank_${message.author.id}`).then(k => {
                if (k.text == 'admin') {
                    let commandFile = require(`./commands/${cmd}(k94Reh).js`);
                    commandFile.run(bot, message, args, start);
                } else {
                    message.channel.send('You are not an admin!')
                }
            })
        } catch (err) {
            console.log(err);
            message.channel.send(`Sorry, "${cmd}" is not a working command. To see a list of all commands, use a?help.`)
        } finally {
            console.log(`${sender.username} ran the admin command: ${cmd} with arguments: ${args}`)
            fs.writeFileSync(`./log[${start}].txt`, `\n${sender.username} ran the admin command: ${cmd} with arguments: ${args}`)
        }
    }
//level system
    bot.user.setGame(`??Help | In ${bot.guilds.array().length} servers!`)    
    try {
        if (message.guild == null) return;
        if (message.author.bot) return;
        db.fetchObject(`lastsend_${message.author.id}`).then(last => {
            if (message.createdTimestamp - last.value > 3000) {
                db.updateValue(message.author.id, 1).then(i => {
                    db.fetchObject(`userLevel_${message.author.id}`).then(e => {
                        db.fetchObject(`reputation_${message.author.id}`).then(o => {
                            db.fetchObject(`topUser_${message.guild.id}`).then(j => {
                                if (e.value + 1 > j.value) {
                                    db.updateText(`topUser_${message.guild.id}`, message.author.username).then(l => {
                                        console.log(`${l.text} is the new top user of ${message.guild.id}`)
                                    })
                                    db.updateValue(`topUser_${message.guild.id}`, e.value).then(l => {
                                    })
                                }
                            })
                            if ((Math.ceil(Math.pow(e.value + 1, 3) * .1)) + e.value <= i.value + o.value) {
                                db.updateValue(`userLevel_${message.author.id}`, 1).then(w => {
                                    message.channel.send(`Congrats ***${message.author.username}***, you reached level ${w.value}!`).then(msg => {
                                        msg.delete(3000)
                                    })
                                    db.updateValue(`Userbalance_${message.author.id}`, 5 * w.value)
                                    fs.writeFileSync(`./log[${start}].txt`, `\nLevel${w.value}::XP${i.value+o.value}/${(Math.ceil(Math.pow(e.value + 1, 3) * .1)) + e.value}`)
                                })
                            }
                        })
                    })
                })
                db.updateValue(`Userbalance_${message.author.id}`, 1)
                    db.updateValue(`Spamamount_${message.author.id}`, -5).then(am => {
                        if (am.value < 0) {
                            db.updateValue(`Spamamount_${message.author.id}`, Math.abs(am.value))
                            fs.writeFileSync(`./log[${start}].txt`,`\n${am.value} :: ${message.author.username}`)
                        }
                    })
            } else {
                db.updateValue(`Spamamount_${message.author.id}`, 1).then(am => {
                    //console.log(`${am.value} :: ${message.author.username}`)
                    if (am.value > 15) {
                        message.channel.send(`Due to excessive spamming, I have decreased your XP by 50 **${message.author.username}**`).then(msg => {
                            msg.delete(3000)
                        })
                        fs.writeFileSync(`./log[${start}].txt`, `\nRemoved 50XP from ${message.author.username} because Excessive spamming`)
                        db.updateValue(`reputation_${message.author.id}`, -50)
                    }
                })
            }
        })  
    } catch (err) {
        console.log(err)
    }
//Check mentions
    try {
        var someoneafk = false
        if (message.mentions.users.first() != undefined) {
            const embed = new Discord.RichEmbed()
                .setColor(0x1D82B6)
            db.fetchArray(`AFKusers_${message.guild.id}`).then(afk => {
                db.fetchArray(`AFKreasons_${message.guild.id}`).then(rea => {
                    mentions = message.mentions.users.array()
                    for (l = 0; l < mentions.length; l++) {
                        for (i = 0; i < afk.length; i++) {
                            if (afk[i] == mentions[l].username) {
                                embed.addField(`**${mentions[l].username}** is **AFK**!`, `Reason: **${rea[i]}**`)
                                someoneafk = true
                            }
                        }
                    }
                    if (someoneafk) {
                        message.channel.send(embed).then(msg => {
                            msg.delete(3000)
                        })
                    }
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
})