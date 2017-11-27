const discord = require('discord.js');
const pak = require("../package.json")
const config = require("../config.json")

module.exports.run = (bot, message, args) => {
  let embed = new discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${bot.user.username} Infomation`, bot.user.avatarURL)
    .setColor("7289DA")
    .addField(`Version`, `${pak.version}`, true)
    .addField(`Library`, `discord.js`, true)
    .addField(`Creator`, `${pak.author}`, true)
    .addField(`Servers`, `${bot.guilds.array().length}`, true)
    .addField(`Users`, `${bot.users.array().length}`, true)
    .addField(`Channels`, `${bot.channels.array().length}`, true)
    .addField(`Invite`, `N/A`, true)
    .addField(`Support`, `[Patreon](https://www.patreon.com/_RHG)`, true)
  message.channel.send({embed}).then(m => m.delete(35000))
}

module.exports.help = {
  name: "info",
  usage: ``,
  information: "I'll tell you some information on me!"
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
}
