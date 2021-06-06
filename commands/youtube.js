/* jshint -W100*/
const youtube = require("youtube-node"),
     getRSS = require("../runtime/RSS.js"),
     moment = require("moment"),
     discord = require(`discord.js`);


module.exports.run = (bot, message, args) => {
  if (!args) return message.channel.send(`${msg.author.mention} Please include a query and (optional) number of results to show 💁‍♂`);
    let query = args.join(" ");

    const yt = new youtube();
    yt.setKey(process.env.ytapikey ? process.env.ytapikey : config.keys.ytapikey);
    yt.search(query, 5, (err, res) => {
      if (err) {
        message.channel.send("📺 Nothing found on YouTube");
      } else {
        let ytresults = res.items.map(item => {
          switch (item.id.kind) {
            case "youtube#playlist":
              return `**${item.snippet.title}**\nhttp://www.youtube.com/playlist?list=${item.id.playlistId}`;
            case "youtube#video":
              return `**${item.snippet.title}**\nhttp://www.youtube.com/watch?v=${item.id.videoId}`;
            case "youtube#channel":
              return `**${item.channelTitle}**\nhttp://www.youtube.com/channel/${item.id.channelId}`;
          }
        });

        let embed = new discord.RichEmbed()
          .setAuthor(`Youtube User: ${args[0]}`)
          .setColor("7289DA")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setDescription(info);

        message.channel.send({ embed }).then(m => m.delete(10000));
      }
    });
};

module.exports.help = {
     name: "youtube",
     usage: `[username]`,
     information: "Let's get the latest videos from a user!"
};

module.exports.settings = {
     permission: "All",
     deleteresponder: true,
     category: "SocialHIDE"
};
