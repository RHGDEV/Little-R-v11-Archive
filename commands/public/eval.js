const Discord = require('discord.js');

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

module.exports.run = (bot, message, args) => {

  const code = args.join(" ");
  let evaled = eval(code);

  if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled);

  message.channel.send(clean(evaled), {
    code: "xl"
  });

  let em = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`${bot.user.username} Premium`, bot.user.avatarURL)
    .setDescription(preMessage)

  message.channel.send({
    embed: em
  }).then(m => m.delete(55000))
}

module.exports.help = {
  name: "checkpremium",
  usage: ``,
  information: "Let's check your premium status!"
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Info"
}
