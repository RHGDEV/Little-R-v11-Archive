const config = require("../config.json"),
  discord = require("discord.js"),
  pak = require("../package.json"),
  whiteList = config.whitelist,
  { eventlogger } = require("../util/eventLogger.js");

module.exports = (bot, db,  guild) => {
  console.log(`[JOIN] [#${guild.memberCount}] ${guild.name}, ${guild.id}`);
  eventlogger(bot, "green", `**Guild Join**\n\n**Guild:** ${guild.name} (${guild.id})\n**Owner:**<@${guild.owner.user.id}> ${guild.owner.user.tag} (${guild.owner.user.id})\n**Large:** ${guild.large}\n**Member Count:** ${guild.memberCount}\n\n**Total Guilds:** ${bot.guilds.array().length}`, guild.iconURL !== null ? guild.iconURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png");
  // Once you've applied the role to your moderators or admins, type -setup in chat and begin my automated setup process by replying me me using plain text.

  if (whiteList.whitelist == true) {
    var allowedServer = false;
    whiteList.whitelistedServers.forEach((id) => {
      if (guild.id == id) {
        allowedServer = true;
      }
    });
    if (!allowedServer) {
      console.log(`[LEFT] [#${guild.memberCount}] ${guild.name}, ${guild.id} due to whitelist`);
      guild.leave();
      return;
    } else {
      console.log(`[SERVER] [#${guild.memberCount}] ${guild.name}, ${guild.id} | Joined: ${guild.joinedAt.toString()}`);
    }
  }
  let join_embed = new discord.RichEmbed()
    .setColor(`7289DA`)
    .setAuthor(bot.user.username)
    .addField(`👋 Hey there!`, `My name is ${bot.user.username}, another Discord bot. Sorry for the message but I felt there are some things that are needed to be said about me.`)
    .addField(`🤔 Getting started`, `Getting started with me is easy. In order to begin my setup process you must create a role that has permissions tob *View Audit Log* and *Manage Roles*. This role will be required for all the members on the server you wish to have access to my moderation commands such as kicking and warning. *Don't worry about yourself you have access to anything no matter what.* (Execpt Creator and Premium Only commands!)`)
    .addField(`🤑 Premium`, `***You can choose to upgrade to Premium, but it's not really worth it right now.*** Premium can be bought by the guild / server owner (YOU) and the guild will be whitelisted as a Premium server. A user cannot buy premium for themselves sadly.`)
    .addField(`📚 Everything else`, `If you're having issues with the setup process or any other commands, please check out the documentation on the bot's [website](${config.social.Website}) or join our [support](https://discord.gg/${config.social.discordCode}) server.`)
    .addField(`Thank you for choosing ${bot.user.username}`, `I wish you the best of luck with your server`)
    .setFooter(`v${pak.version}`);

 // guild.owner.send({ embed: join_embed });

  // var guildSchema = new db.Schema({
  //   guild_name: String,
  //   guild_id: String,
  //   prefix: String,
  //   logChannel: String,
  //   adminRoles: [],
  // });
  // var guildModel = db.model(guild.id, guildSchema);
  // guildModel.find({ guild_id: guild.id }, function (err, docs) {
  //   if (docs < 1) {
  //     var newGuild = new guildModel();
  //     newGuild.guild_name = guild.name;
  //     newGuild.guild_id = guild.id;
  //     newGuild.prefix = config.default.prefix;
  //     newGuild.save();
  //   }
  // });
};