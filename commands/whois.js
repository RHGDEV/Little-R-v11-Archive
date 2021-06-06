const Discord = require('discord.js'),
  statusEmojis = {
    "online": "<:online:397932529702928385>",
    "idle": "<:idle:397932529925226496>",
    "dnd": "<:dnd:397932529665048592>",
    "offline": "<:invisible:397932529761386497>"
  };
module.exports.run = (bot, message, args) => {
  let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;
  let member = message.guild.member(user);
  let roles = [];
  if (member.roles.size > 0) {
    member.roles.forEach(r => {
      if (!r.name.includes("everyone")) {
        roles.push(r.name);
      }
    });
  } else {
    roles = "no";
  }
  let ttt = (member.roles.size > 0) ? roles.length : "0";
  let wato = (roles.length > 0) ? roles.join(", ") : "None";
  let game = (!!user.presence && user.presence !== null && user.presence.game !== null && user.presence.game.name !== null) ? user.presence.game.name : "Nothing";
  let whois = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`${message.author.username} is asking who is ${user.username}`, message.author.avatarURL !== null ? message.author.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png")
    .setThumbnail(user.avatarURL !== null ? user.avatarURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png")
    .setFooter(bot.user.username, bot.user.avatarURL)
    .addField(`🗿 User`, `${user.tag} \n(${user.id})`, true)
    .addField(`Nickname`, `${member.nickname !== null ? member.nickname : "No nickname"}`, true)
    .addField(`Status`, `${statusEmojis[user.presence !== null && user.presence.status !== null ? user.presence.status : "offline"]} ${user.presence !== null && user.presence.status !== null ? user.presence.status : "offline"}`, true)
    .addField(`Game`, `Playing ${game}`, true)
    .addField(`Joined On`, `${member.joinedAt.toString()}`, false)
    .addField(`Account Created On`, `${user.createdAt.toString()}`, false)
    .addField(`Roles [${ttt}]`, `${wato}`, false);

  message.channel.send({ embed: whois }).then(m => m.delete(15000));
};

module.exports.help = {
  name: "whois",
  usage: `(mention)`,
  information: "Get features of you or another person by mentioning them!"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
};