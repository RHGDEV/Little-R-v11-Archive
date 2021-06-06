const Discord = require(`discord.js`);

module.exports.run = (bot, message, args) => {
  let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;

  let embed = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Avatar`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`${message.author} \n Avatar for ${user.username}`)
    .setImage(user.avatarURL);

  message.channel.send({embed}).then(m => m.delete(10000));
};


module.exports.help = {
  name: "avatar",
  usage: `mention`,
  information: "Let's drag someone's avatar!"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
};