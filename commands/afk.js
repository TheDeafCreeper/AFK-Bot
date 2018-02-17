const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args, start) => {
    try {
        if (args.length == 0) {
            args = ['AFK']
        }
        var ran = false
        db.fetchArray(`AFKusers_${message.guild.id}`).then(afk => {
            db.fetchArray(`AFKreasons_${message.guild.id}`).then(rea => {
                afk[0] = ''
                for (i = 0; i < afk.length; i++) {
                    if (afk[i].toLowerCase() == message.author.username.toLowerCase()) {
                        message.channel.send(`I have changed your **AFK** reason to **${args.join(' ')}**`).then(msg => {
                            msg.delete(3000)
                        })
                        rea[i] = args.join(' ')
                        ran = true
                        break;
                    }
                }
                if (!ran) {
                    afk.push(message.author.username)
                    rea.push(args.join(' '))
                    message.channel.send(`I have set your AFK **${message.author.username}. Reason: **${args.join(' ')}`)
                    
                    fs.writeFileSync(`./log[${start}].txt`, `\nSet the AFK of ${message.author.username} on server ${message.guild.name} for the reason of ${args.join(' ')}`)
                }
                db.setArray(`AFKusers_${message.guild.id}`, afk)
                db.setArray(`AFKreasons_${message.guild.id}`, rea)
            })
        })
    } catch (err) {
        console.log(err);
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}