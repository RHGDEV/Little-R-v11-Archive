const Discord = require('discord.js');

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

module.exports.run = (bot, message, args) => {
  return; //soon
}

module.exports.help = {
  name: "eval",
  usage: ``,
  information: "Welp"
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Info"
}