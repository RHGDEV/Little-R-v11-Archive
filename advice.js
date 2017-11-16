module.exports.run = (bot, message, args) => {
  require('request')('http://api.adviceslip.com/advice', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      message.channel.send(`**Advice:**\n\n ${JSON.parse(body).slip.advice}`).then(m => m.delete(25000))
    } else {
      message.channel.send(`**Advice:**\n\n I couldn't think of any advice...`).then(m => m.delete(25000))
    }
  });
}

module.exports.help = {
  name: "advice",
  usage: ``,
  information: "I'll give you some great advice, I'm just too kind."
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
}
