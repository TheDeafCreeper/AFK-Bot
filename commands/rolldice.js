const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        var number = 1
        if (args[0] == NaN) return;
        if (args[1] == NaN) return;
        if (args[1] != undefined) {
            number = args[1]
        }
        if (args[0] > 500) {
            args[0] = 500
        }
        if (number > 25) {
            number = 25
        }
        var roll = [0];
        for (i = 0; i <= number - 1; i++) {
            roll[i] = Math.floor((Math.random() * value)) + 1
        }
        if (number == 1) {
            message.channel.send(`You rolled a **${roll[0]}**!`)
        } else if (number >= 2) {
            message.channel.send(`Rolled **${number}** dice with a value of **${value}**.`)
            message.channel.send(`You rolled the dice **${roll.join(', ')}**!`)
        } else {
            message.channel.send('One of the values you entered was not a number.')
        }
    } catch (err) {
        console.log(err);
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}