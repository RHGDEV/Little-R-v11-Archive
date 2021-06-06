const discord = require('discord.js'),
request = require('request');

module.exports.run = (bot, message, args) => {
  request('http://yesno.wtf/api/?force=' + args[0], function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var yesNo = JSON.parse(body);

      let yeNo = new discord.RichEmbed()
        .setAuthor(`YES or NO`)
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("7289DA")
        .setDescription(`${message.author}`)
        .setImage(yesNo.image);

      message.channel.send({ embed: yeNo }).then(m => m.delete(25000));

    } else {
      message.channel.send(`Error found..`).then(m => m.delete(25000));
    }
  });
};

module.exports.help = {
  name: "yesno",
  usage: `[force yes/no/maybe]`,
  information: "Answer yes or no with a gif (or randomly choose one!)"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
};