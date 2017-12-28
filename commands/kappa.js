module.exports.run = (bot, message, args) => {
  message.channel.send(`🌀 Please wait. Loading image before sending...`).then(m => {
    message.channel.send({ file: "./assets/kappa.png" }).then(attach => {
      m.delete()
    });
  });
}

module.exports.help = {
  name: "kappa",
  usage: ``,
  information: "Kappa Kappa Kappa Kappa Kappa"
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
}