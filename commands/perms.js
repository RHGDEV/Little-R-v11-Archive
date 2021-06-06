const Discord = require(`discord.js`),
checkPerm = require("../util/permissions.js"),
permissions = ["Admin", "Owner", "Creator"];

module.exports.run = (bot, message, args) => {
  var peram = "Normal User";

  permissions.forEach(perm=> {
    if (checkPerm(bot, message, perm, false)) {
      peram = perm;
    }
  });

  let embed = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Permissions`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`${message.author} Your permissions on the bot is: \n\n **${peram}**`);

  message.channel.send({ embed: embed });
};

module.exports.help = {
  name: "perms",
  usage: ``,
  information: "Check your perms on the current server"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
};