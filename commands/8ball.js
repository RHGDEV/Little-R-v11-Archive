module.exports.run = (bot, message, args) => {
  require('request')('https://8ball.delegator.com/magic/JSON/0', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      message.channel.send(`**8ball:**\n\n ${JSON.parse(body).magic.answer}`).then(m => m.delete(25000));
    } else {
      message.channel.send(`**8ball:**\n\n I couldn't contact 8ball...`).then(m => m.delete(25000));
    }
  });
};

module.exports.help = {
  name: "8ball",
  usage: `[question]`,
  information: "Ask the 8ball a question!"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
};
