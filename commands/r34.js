const Discord = require(`discord.js`)

module.exports.run = (bot, message, args) => {
  return //SOON
  let embed = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Game`, bot.user.avatarURL)
    .setDescription(`👢 You have been kicked from ${message.guild.name}!\n**Reason:** ${reason}`)
    .setTimestamp()
  message.channel.send({ embed: embed });
}


module.exports.help = {
  name: "r34",
  usage: `[search prams]`,
  information: "Look onto rule34.xxx"
}

module.exports.settings = {
  permission: "Hidden",
  deleteresponder: true,
  category: "18+"
}