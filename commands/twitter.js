const getRSS = require("../runtime/RSS.js"),
     moment = require("moment"),
     discord = require(`discord.js`);


module.exports.run = (bot, message, args) => {
  if (args[0]) {
    if (args[0].startsWith("@")) {
      args[0] = args[0].slice(1);
    }
    let query = args[0];

    if (!query) {
      query = args;
    }

    getRSS(`http://twitrss.me/twitter_user_to_rss/?user=${encodeURIComponent(query)}`, 5, (err, articles) => {
      if (err || articles.length == 0) {
        message.channel.send(`I can't find a ${query} on Twitter 🐦`).then(m => m.delete(10000));
      } else {
        const info = articles.reverse().map((a, i) => {
          return `**${a.author}, ${moment(a.published).fromNow()}\n<${a.link}>** \n${a.title}\n`;
        });

        let embed = new discord.RichEmbed()
          .setAuthor(`Twitter User: ${args[0]}`)
          .setColor("7289DA")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setDescription(info);

        message.channel.send({ embed }).then(m => m.delete(10000));
      }
    });
  } else {
    message.channel.send("https://twitter.com 🐦").then(m => m.delete(10000));
  }
};

module.exports.help = {
     name: "twitter",
     usage: `[username]`,
     information: "Let's get the latest tweets from a user!"
};

module.exports.settings = {
     permission: "All",
     deleteresponder: true,
     category: "Social"
};
