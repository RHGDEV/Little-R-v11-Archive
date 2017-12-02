const discord = require('discord.js');


module.exports.run = (bot, message, args) => {
 // return; //SOON
  let chan_list = []
  message.guild.channels.forEach(async(chan, id, i) => {
    chan_list.push(`${i}:    ${chan.name}, ${id}\n`)
  });
  let embed = new discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${bot.user.username}'s Visible channels in ${message.guild}`, bot.user.avatarURL)
    .setColor("7289DA")
    .setDescription(chan_list)

  message.channel.send({embed}).then(m => m.delete(35000))
}

module.exports.help = {
  name: "vischannels",
  usage: ``,
  information: "View what the bot can see in it's eyes."
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Info"
}
