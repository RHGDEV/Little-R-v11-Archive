const discord = require('discord.js');

function sendAnnounce(bot, message, args, guild) {
  var sendChannel = ""
  if (guild.channels.find("name", "general")) {
    sendChannel = guild.channels.find("name", "general")
  } else if (guild.channels.find("name", "chat")) {
    sendChannel = guild.channels.find("name", "chat")
  } else if (guild.channels.find("name", "lounge")) {
    sendChannel = guild.channels.find("name", "lounge")
  } else if (guild.channels.find("name", "announcements")) {
    sendChannel = guild.channels.find("name", "announcements")
  }

  let announce = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`📢 ${bot.user.username} Announcement 📢`, bot.user.avatarURL)
    .setDescription(`**Hello Rusty here, creator of Little R just wanting you to know, **\n${args.join(' ')}\n\n**This message was sent to *${guild.name}* on purpose from the creator.**\n*This announcement system wil also not be spammed alot.*`)
    .setFooter(`An official announcement from Rusty. (RHG#0822)`)
    .setTimestamp()

  if (sendChannel !== "") {
    sendChannel.send({ embed: announce })
      .then(() => {
        message.channel.send(`☑ Sent announcement to ${guild.name}`).then(m => m.delete(10000))
      })
      .catch(err => {
        message.channel.send(`🗳 Faild to send announcement to ${guild.name} (Send Error)`).then(m => m.delete(10000))
      })
  } else {
    message.channel.send(`🗳 Faild to send announcement to ${guild.name} (No channel)`).then(m => m.delete(10000))
  }
}

module.exports.run = (bot, message, args) => {
  //return; // SOON
  let announceTest = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Test Announcement`, bot.user.avatarURL)
    .setDescription(`**Hello Rusty here, creator of Little R just wanting you to know,**\n${args.join(' ')}\n\n**This message was sent to *${message.guild.name}* on purpose from the creator.**\n*This announcement system wil also not be spammed alot.*`)
    .setFooter(`Test Example reply with yes to send to every server!`)
    .setTimestamp()

  message.channel.send({ embed: announceTest })
    .then((m) => {
      message.channel.awaitMessages(response => response.content.toLowerCase() === 'yes', {
          max: 1,
          time: 10000,
          errors: ['time'],
        })
        .then((collected) => {
          m.delete()
          collected.first().delete()
          message.channel.send(`Now sending an announcement to every guild im in! [${bot.guilds.array().length} guilds]`).then(m => m.delete(10000))
          bot.guilds.forEach(async (guild, id) => {
            sendAnnounce(bot, message, args, guild)
          })
        })
        .catch(() => {
          message.channel.send(`Announcement canceled`).then(m => m.delete(5000))
          m.delete()
        });
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