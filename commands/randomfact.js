const fetch = require("snekfetch");
const discord = require("discord.js");

exports.run = async (bot, message, args) => {
    const url = "https://www.cs.cmu.edu/~bingbin/";

    var responseRequest = await fetch.get(url);
    var response = responseRequest.body.toString();

    var startPos = response.indexOf("</center>") + 9;
    var contentUntrimmed = response.substring(startPos);

    var endPos = contentUntrimmed.indexOf("<center>");
    var content = contentUntrimmed.substring(0, endPos);

    var facts = content.split("<p>");

    var random = Math.floor(Math.random() * facts.length)
    //message.channel.send(`**(#${random + 1})** ${facts[random]}`);
    var embed = new discord.RichEmbed()
        .setTitle("Random Fact")
        .setDescription(facts[random])
        .setFooter(`(#${random}) From ${url}`);
    message.channel.send(embed);
}