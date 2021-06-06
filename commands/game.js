const Discord = require(`discord.js`),
game_abbreviations = require("../runtime/abbreviations.json");

module.exports.run = (bot, message, args) => {
  if (!args) return message.channel.send(`:x: Well I guess you want to play a blank game.`);
  var game = game_abbreviations[args];
  if (!game) { game = args.join(" ");}

  let embed = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Game Alert`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setThumbnail(message.author.avatarURL !== null ? message.author.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png")
    .setDescription(`**${message.author}** - **${game}**\n\n**${message.author.tag}** would like to know if anyone is up for **${game}**`);
  message.channel.send({ embed: embed });
};


module.exports.help = {
  name: "game",
  usage: `[game]`,
  information: "Pings channel asking if anyone wants to play."
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
};