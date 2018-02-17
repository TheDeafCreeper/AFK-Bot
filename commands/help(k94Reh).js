const Discord = require('discord.js');
const fs = require('fs');
const commands = JSON.parse(fs.readFileSync('./help.json', 'utf8'))
const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        db.fetchObject(`Prefix_${message.guild.id}`).then(i => {
            var prefix = i.text
            const embed = new Discord.RichEmbed()
                .setColor(0x1D82B6)

                let commandsFound = 0;
            for (var cmd in commands) {
                if (commands[cmd].group === 'Admin') {
                    embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix+commands[cmd].usage}\n**Example:**${prefix+commands[cmd].example}`)
                } 
                embed.setDescription(`Admin prefix: a? :: <Required> [Optinal]`)
            }
            embed.setDescription(`<Required> [Optinal]`)
            message.author.send({embed})
            message.channel.send('**' + message.author + '** check your DMs!')
        })    
    } catch (err) {
        console.log(err)
        console.log('Error running command "help".')
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}
