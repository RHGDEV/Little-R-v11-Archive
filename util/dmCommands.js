/* jshint -W027 */

const discord = require('discord.js');

module.exports = (bot, message) => {

  if (message.cleanContent.toLowerCase() == "cleardm") {
    message.channel.fetchMessages({limit: 100}).then(m => {
      m.forEach((msg) => {
        if (msg.author.id == bot.user.id) {
          msg.delete();
        }
      });
    });
    return;
  } else {
    message.channel.send("DM comamnds under work! Please check back soon!");
    return;
  }
//   } else if (message.cleanContent.toLowerCase() == "info") {
//     require("../commands/info.js").run(bot, message, args);
//     return;
//   } else if (message.cleanContent.toLowerCase() == "uptime") {
//     require("../commands/uptime.js").run(bot, message, args);
//     return;
//   } else {
//     let embed = new discord.RichEmbed()
//       .setAuthor(`I do have some commands you can use in DM!`, bot.user.avatarURL)
//       .setColor("7289DA")
//       .setFooter(`${bot.user.username} DM Command List`)
//       .setDescription(`
// **__Just type the command without the prefix!__**\n\n
// [(Anything sent in dm)]() :: I will send this list to you!
// [info]() :: I will send you some bot infomation!
// [uptime]() :: I will send you how long I have been awake for!

//       `);

//     message.channel.send({embed: embed});
//     return;
//   }

};
