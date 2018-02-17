const fs = require('fs')
exports.run = (bot, message, args) => {
    try {
        var tie = false
        var win = false
        var lose = false
        var choice = Math.floor((Math.random() * 3))
        var choices = ['rock', 'paper', 'scissors']
        var chosen = choices[choice]
        var userchoice = args[0].toLowerCase()
        if (args[0] == undefined) {
            message.channel.send(`Please define a choice ${(choices)}`)
        } else if (choices[choice] == userchoice) {
            tie = true

        } else if (userchoice == 'rock') {
            if (chosen == 'paper') {
                var lose = true

            } else if (chosen == 'scissors') {
                var win = true

            }
        } else if (userchoice == 'paper') {
            if (chosen == 'scissors') {
                var lose = true

            } else if (chosen == 'rock') {
                var win = true

            }
        } else if (userchoice == 'scissors') {
            if (chosen == 'rock') {
                var lose = true

            } else if (chosen == 'paper') {
                var win = true

            } else {
                message.channel.send('Please choose rock, paper, or scissors.')
            }
        }
        if (tie) {
            message.channel.send(`I also chose ${chosen} so it's a tie!`)
        } else if (win) {
            message.channel.send(`I chose ${chosen} so you **Win**!`)
        } else if (lose) {
            message.channel.send(`I chose ${chosen} so you lose!`)
        }
    } catch (err) {
        console.log(err)
        message.channel.send('Woops! It seems this command has thrown an error, please report it to TheDeafCreeper!')
    }
}