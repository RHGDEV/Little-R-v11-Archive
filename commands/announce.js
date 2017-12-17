const discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  //return; // SOON
  message.channel.send(`Now sending an announcement to every guild im in!`).then(m => m.delete(5500))

  bot.guilds.forEach(async (guild, id) => {
    var sendChannel = ""
    if (guild.channels.find("name", "general")) {
      sendChannel = guild.channels.find("name", "general")
    } else if (guild.channels.find("name", "announcements")) {
      sendChannel = guild.channels.find("name", "announcements")
    }

    let announce = new discord.RichEmbed()
      .setColor("7289DA")
      .setAuthor(`📢 ${bot.user.username} Announcement 📢`, bot.user.avatarURL)
      .setDescription(`${args.join(' ')}`)
      .setFooter(`Thanks so much Rusty, creator of Little R!`)
      .setTimestamp()

    if (sendChannel !== "") {
      sendChannel.send({ embed: announce })
    } else {
      message.channel.send(`Faild to send announcement to ${guild.name}`).then(m => m.delete(5500))
    }
  });
}

module.exports.help = {
  name: "announce",
  usage: ``,
  information: "Let's announce to every discord server!"
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Creator"
}