const config = require("../config.json");
const prefix = config.prefix
const creatorid = config.creatorid
const logid = config.clogid
const profanities = require("../profanities.json")
const {makeCase} = require('../util/makeCase.js');

function removedat(msg, cmd) {
  if (cmd.settings.deleteresponder) {
    if (!msg.deletable) return
    setTimeout(function() {
      msg.delete()
    }, 3000)
  };
}

module.exports = (bot, message, commands) => {
  let mArray = message.content.split(" ");
  let args = mArray.slice(1);

  let cmd = commands.get(mArray[0].slice(prefix.length));
  if (message.author.bot) return;
  if (message.channel.type === "dm") return

  if (!cmd) {
    if (message.channel.name == "photos") {
      if (message.attachments.size === 0) {
        message.channel.send(`<@${message.author.id}>, You're not allowed to talk in a photo only channel!`).then(m => m.delete(10000))
        message.delete(2500)
        return;
      };
    };
    for (x = 0; x < profanities.length; x++) {
      if (message.cleanContent.toLowerCase().includes(profanities[x].toLowerCase())) {
        // if (message.content.toLowerCase() == profanities[x].toLowerCase()) {
        console.log(`[Profanity] ${message.author.username}, said ${profanities[x]} in the ${message.channel.name} channel!`)
        makeCase(bot, "Profanity", `Auto-Mod`, bot.user.tag, message.author.tag, `**Said:** ${profanities[x]}\n**Message:** ${message.content}`)
        message.channel.send(`<@${message.author.id}>, Please do not use profanity in this server!`).then(m => m.delete(10000))
        message.delete(500)
        return;
      };
    };
  };

  if (message.content.indexOf(config.prefix) !== 0) return;

  if (cmd) {
    message.channel.startTyping();

    if (cmd.settings.permission.toLowerCase() == "creator") {
      if (!message.author.id == config.creatorID) {
        message.channel.send(":x: Invaild permissions! Needed: Creator").then(m => m.delete(2500))
        message.channel.stopTyping();
        removedat(message, cmd)
        return;
      };
    };

    if (cmd.settings.permission.toLowerCase() == "admins") {
      if (!message.member.roles.some(r => ["RHG", "Admin"].includes(r.name))) {
        message.channel.send(":x: Invaild permissions! Needed: Admin+").then(m => m.delete(2500))
        message.channel.stopTyping();
        removedat(message, cmd)
        return;
      };
    };
    cmd.run(bot, message, args);
    removedat(message, cmd)
    setTimeout(function() {
      message.channel.stopTyping();
    }, 5000)
  };
}
