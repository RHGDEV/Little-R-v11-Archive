module.exports.run = (bot, message, args) => {
  message.channel.send(`🌀 Please wait. Loading image before sending...`).then(m => {
    message.channel.send({ file: "./assets/happening.gif" }).then(attach => {
      m.delete()
    });
  });
}

module.exports.help = {
  name: "happening",
  usage: ``,
  information: "It's happening!"
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
}