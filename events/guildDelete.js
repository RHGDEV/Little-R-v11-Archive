const { eventlogger } = require("../util/eventLogger.js");

module.exports = (bot, db, guild) => {
  console.log(`[LEFT] [#${guild.memberCount}] ${guild.name}, ${guild.id}`);
  eventlogger(bot, "red", `**Guild Leave**\n\n**Guild:** ${guild.name} (${guild.id})\n**Owner:**<@${guild.owner.user.id}> ${guild.owner.user.tag} (${guild.owner.user.id})\n**Large:** ${guild.large}\n**Member Count:** ${guild.memberCount}\n\n**Total Guilds:** ${bot.guilds.array().length}`, guild.iconURL !== null ? guild.iconURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png");
  //db.remove(guild.id);
   var guildSchema = new db.Schema({
    guild_name: String,
    guild_id: String,
    prefix: String,
    logChannel: String,
    adminRoles: [],
  });
  var guildModel = db.model(guild.id, guildSchema);

  guildModel.findOneAndDelete({ guild_id: guild.id }, function (err, docs) {
    // if (docs < 1) {
    //   newGuild.save();
    // }
  });
};