const discord = require('discord.js'),
{ version } = require('discord.js'),
moment = require('moment');
require('moment-duration-format');


module.exports.run = (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

  var status = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Status`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setTimestamp()
    .setDescription(`**= STATISTICS =**
  • Users  ::  ${bot.users.size.toLocaleString()}
  • Uptime  ::  ${duration}
  • Server${bot.guilds.array().length > 1?"s":""}  ::  ${bot.guilds.size.toLocaleString()}
  • Channel${bot.channels.array().length > 1?"s":""}  ::  ${bot.channels.size.toLocaleString()}
  • Memory Usage  ::  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
  • Discord.js  ::  v${version}
  • Node  ::  ${process.version}
  • Source  :: [GitHub](https://github.com/RHGDev/Little-r)
  • Donation  :: [Patreon](https://patreon.com/_RHG)
  • Website  :: [Website](https://littler.tk)
  `);


  message.channel.send({ embed: status }).then(m => m.delete(55000));
};

module.exports.help = {
  name: "stats",
  usage: ``,
  information: "Gives some useful bot statistics."
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
};