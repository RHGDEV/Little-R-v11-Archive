const config = require("../config.json");
const discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  // Status: invisible, dnd, idle, online
  // player: any way

  //if (!args) return message.channel.send(`Why no args senpi?`).then(m => m.delete(2500))
  if (args[0] == "s") {
    var status = args[1]
    bot.user.setStatus(status)
  } else {
    var game = ""
    if (args[0]) {
      game = args.join(" ")
      bot.user.setGame(`${game}`)
    } else {
      bot.user.setGame(`${config.default.prefix}help | https://LittleR.tk`)
    }

  }
}

module.exports.help = {
  name: "cstatus",
  usage: ``,
  information: "Change the status of the bot in any way, shape, or form."
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Info"
}