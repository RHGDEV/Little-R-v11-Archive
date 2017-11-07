const config = require("../config.json");
module.exports.run = (bot, message, args) => {
  message.channel.send(":wave: Little R will now Shutdown...").then(m => m.delete(9999))
  setTimeout(function() {
    process.exit(666);
  }, 10010)
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
