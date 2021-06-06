const discord = require('discord.js');
var request = require('request');

module.exports.run = (bot, message, args) => {
  if (!args) message.channel.send(`Well I guess you don't want to search for nothing.`).then(m => m.delete(15000));
  request('http://api.urbandictionary.com/v0/define?term=' + args[0], function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var uD = JSON.parse(body);
      if (uD.result_type !== "no_results") {
        message.channel.send(`**I searched on Urban Dictionary for ${args[0]}:** \n\n   **Definitions:**\n${uD.list[0].definition}\n\n   **Examples:**\n${uD.list[0].example}`).then(m => m.delete(25000));
      } else {
        message.channel.send(`This is so screwed up, Urban Dictionary doesn't have ${args[0]} in it's database...`).then(m => m.delete(25000));
      }
    } else {
      message.channel.send(`Error searching Urban Dictionary.`).then(m => m.delete(25000));
    }
  });
};

module.exports.help = {
  name: "urban",
  usage: `[string]`,
  information: "Search Urban Dictionary, one of the original AIDS of the internet!"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "18+"
};