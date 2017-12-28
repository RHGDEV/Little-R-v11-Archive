module.exports.run = (bot, message, args) => {
  message.channel.send(":wave: Little R will now Shutdown...").then(m => m.delete(5000))
  setTimeout(function() {
    bot.logout();
    process.exit(0);
  }, 10000)
}

module.exports.help = {
  name: "shutdown",
  usage: ``,
  information: "Shutdown or crash the bot (The fancy way)"
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Info"
}