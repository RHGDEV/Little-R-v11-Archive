const Discord = require(`discord.js`),
booru = require('booru'),
define = {
  "s": "Safe",
  "q": "Suggestive",
  "e": "Explicit",
  "u": "Unrated"
};

module.exports.run = (bot, message, args) => {
  //return //SOON
  if (!message.channel.nsfw) return message.channel.send(`:x:\nThis channel doesn't have NSFW mode enabled!\nPlease make sure to run this command in a nsfw enabled channel!`).then(m => m.delete(10000));
  if (!args) return message.channel.send(`:x:\nNo args were defind!`).then(m => m.delete(10000));

  booru.search('r34', args, {
    'limit': 1,
    'random': true
  })
    .then(booru.commonfy)
    .then(images => {
      let embed = new Discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`NSFW 🍆`)
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setDescription(`${message.author}\nScore: **${images[0].common.score}**\nRating: **${define[images[0].common.rating]}**`)
        .setImage(images[0].common.file_url);

      message.channel.send({ embed });
    })
    .catch((err) => {
      if (err.name === 'booruError' && err.message != "You didn't give any images") {
        console.error(err.message);

        return message.channel.send(`:x: No juicy images found. An error was logged to your error console`).then(m => m.delete(5000));
      }
      return message.channel.send(`:x: No juicy images found.`).then(m =>m.delete(5000));
    });
};


module.exports.help = {
  name: "r34",
  usage: `[search prams]`,
  information: "Look onto rule34.xxx"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "18+"
};