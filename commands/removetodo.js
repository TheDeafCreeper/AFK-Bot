const db = require('quick.db');
const fs = require('fs')
exports.run = (bot, message, args) => {
   /*try {
        db.fetchArray(`todo_${message.guild.id}`).then(d => {
            var ran = false
            d[0] = ' ';
            for (var i = 1; i < d.length; i++) {
                if (d[i].toLowerCase() == args.join(" ").toLowerCase()) {
                    d.splice(i, 1)
                    ran = true
                    break;
                }
            }
            message.delete(3000)
            if (ran) {
                message.channel.send(`Removed **${args.join(" ")}** from the **To-Do** list.`).then(msg => {
                    msg.delete(3000)
                })
                db.setArray(`todo_${message.guild.id}`, d)
            } else {
                message.channel.send(`Could not find **${args.join(" ")}** on the todo list`).then(msg => {
                    msg.delete(3000)
                })
            }
        })
    } catch (err) {
        console.log(err);
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    } */
    message.channel.send('This command was replaced with ??list, do ??lists to see a list of lists, and ??list to create a list!')
}