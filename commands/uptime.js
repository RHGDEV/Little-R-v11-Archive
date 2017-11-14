module.exports.run = (bot, message, args) => {
  var msgArray = [];
  msgArray.push(`**${bot.user.username} Uptime**\n`);
  var hrs = Math.round(bot.uptime / (1000 * 60 * 60)) + " hrs,"
  var mins = " " + Math.round(bot.uptime / (1000 * 60)) % 60 + " mins, "
  var sec = Math.round(bot.uptime / 1000) % 60 + " seconds"
  msgArray.push(hrs + mins + sec)
  message.channel.send(msgArray).then(m => m.delete(15000))
}

module.exports.help = {
  name: "uptime",
  usage: ``,
  information: "Get the total time Little R has been up."
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
}
