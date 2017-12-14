const discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');


module.exports.run = (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

  var status = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`${bot.user.username} Status`, bot.user.avatarURL)
    .setFooter(``)
    .setTimestamp()
    .setDescription(`**= STATISTICS =**
  • Users  ::  ${bot.users.size.toLocaleString()}
  • Uptime  ::  ${duration}
  • Servers  ::  ${bot.guilds.size.toLocaleString()}
  • Channels  ::  ${bot.channels.size.toLocaleString()}
  • Memory Usage  ::  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
  • Discord.js  ::  v${version}
  • Node  ::  ${process.version}
  • Source  :: [GitHub](https://github.com/RHGDev/Little-r)
  • Donations  :: [Patreon](https://patreon.com/_RHG)
  • Source  :: [Website](https://littler.tk)
  `)


  message.channel.send({ embed: status }).then(m => m.delete(55000))
  console.log(process);
}

module.exports.help = {
  name: "stats",
  usage: ``,
  information: "Gives some useful bot statistics."
}

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
}