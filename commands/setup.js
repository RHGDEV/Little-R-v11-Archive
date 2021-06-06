const discord = require('discord.js');

function continueSetup(bot, message) {
  var setupMain = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Setup Menu`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setTimestamp()
    .setDescription(`
    Hi, I am ${bot.user.username} and I am here to help you through the setup. Do you want to continue the setup?
    *Reply with yes if that's the case*
    `);
  message.channel.send({ embed: setupMain })
    .then((m) => {
      message.channel.awaitMessages(response => response.content, {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
        .then((collected) => {
          let yes = collected.first().content;
          collected.first().delete();
          m.delete();
        })
        .catch(() => {
          m.delete();
        });
    });
}

module.exports.run = (bot, message, args) => {
  var setupMain = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Setup Menu`)
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setTimestamp()
    .setDescription(`
    Hi, I am ${bot.user.username} and I am here to help you through the setup. Do you want to continue the setup?
    *Reply with yes if that's the case*
    `);
  message.channel.send({ embed: setupMain })
  .then((m) => {
    message.channel.awaitMessages(response => response.content.toLowerCase() === 'yes', {
      max: 1,
      time: 15000,
      errors: ['time'],
    })
      .then((collected) => {
        let yes = collected.first().content;
        collected.first().delete();
        m.delete();
        continueSetup(bot, message);
      })

      .catch(() => {
        message.channel.send(`Setup cancled.`).then(m => m.delete(5000));
        m.delete();
      });
  });
};

module.exports.help = {
  name: "setup",
  usage: ``,
  information: "Setup the bot"
};

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Info"
};