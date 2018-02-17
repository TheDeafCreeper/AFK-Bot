const db = require('quick.db');
const fs = require('fs');
const commands = JSON.parse(fs.readFileSync('C:/Users/thede/Desktop/Code/AFK Bot2.0/help.json', 'utf8'))
const Discord = require('Discord.js')
exports.run = (bot, message, args) => {
    try {
        db.fetchObject(`Prefix_${message.guild.id}`).then(i => {
            var prefix = i.text
            const embed = new Discord.RichEmbed()
                .setColor(0x81cdf3)
            if ((args[0]) == undefined) { 
                embed.addField(`Availible groups:`, `All\nUtil\nFun\nShop\nMisc\nShop`)
                embed.setDescription(`Server prefix: ${prefix}`)
            } else {
                let commandsFound = 0;
                for (var cmd in commands) {

                    if (commands[cmd].group === args[0].toLowerCase()) {
                        embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix+commands[cmd].usage}\n**Example:**${prefix+commands[cmd].example}`)
                        commandsFound += 1
                    } else if (args[0].toLowerCase() === 'all') {
                        if (commands[cmd].group != 'Admin') {
                        embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix+commands[cmd].usage}\n**Example:**${prefix+commands[cmd].example}`)
                        commandsFound += 1
                        }
                    }
                    embed.setDescription(`Server prefix: ${prefix} :: <Required> [Optinal] :: Commands Found: ${commandsFound}`)
                }
            }
                message.author.send({embed})
                message.channel.send(`**${message.author.username}** check your DM's!`)
        })    
    } catch (err) {
        console.log(err)
        console.log('Error running command "help".')
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}
