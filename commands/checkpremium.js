const premiumServers = require("../config.json").premiumServers
const checkPremium = require('../util/checkPremium.js');
const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  let preMessage = checkPremium(bot, message, true)

  let em = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`${bot.user.username} Premium`, bot.user.avatarURL)
    .setDescription(preMessage)

  message.channel.send({ embed: em }).then(m => m.delete(55000))
}

module.exports.help = {
  name: "checkpremium",
  usage: ``,
  information: "Let's check your premium status!"
}

module.exports.settings = {
  permission: "Admins",
  deleteresponder: true,
  category: "Info"
}