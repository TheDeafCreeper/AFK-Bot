const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args, start) => {
    /*try {
        db.fetchArray(`todo_${message.guild.id}`).then(d => {
            d[0] = '';
            for (var i = 1; i < d.length; i++) {
                if (d[i].toLowerCase() == args.join(" ").toLowerCase()) {
                    message.channel.send('This is already on the list!').then(msg => {
                        msg.delete(3000)
                    })
                } else {
                    d.push(args.join(" "))
                    db.setArray(`todo_${message.guild.id}`, d)
                    message.channel.send(`Added **${args.join(" ")}** to the **To-Do** list`).then(msg => {
                        msg.delete(3000)
                    })
                    fs.writeFileSync(`./log[${start}].txt`, `\nAdded **${args.join(" ")}** to the **To-Do** list of ${message.guild.name}`)
                    break;
                }
                message.delete(3000)
            }
        })
    } catch (err) {
        console.log(err);
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }*/
    message.channel.send('This command was replaced with ??list, do ??lists to see a list of lists, and ??list to create a list!')
}