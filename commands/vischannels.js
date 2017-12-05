const discord = require('discord.js');


module.exports.run = (bot, message, args) => {
  let chan_list = []
  var num = 1

  chan_list.push(`#          Name,          (Channel ID)\n\n**Text Channels**:`)
  message.guild.channels.forEach(async (chan, id) => {
    if (chan.type == "text") {
      chan_list.push(`${num}:        **${chan.name}**  (${id})`)
      num++
    }
  });
  chan_list.push(`\n\n**Voice Channels**:`)
  num = 1
  message.guild.channels.forEach(async (chan, id) => {
    if (chan.type == "voice") {
      chan_list.push(`${num}:        **${chan.name}**  (${id})`)
      num++
    }
  });
  let embed = new discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`${bot.user.username}'s Visible channels in ${message.guild}`, bot.user.avatarURL)
    .setColor("7289DA")
    .setDescription(chan_list)

  message.channel.send({
    embed
  }).then(m => m.delete(35000))
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