const config = require("../config.json");
const prefix = config.default.prefix
const creatorid = config.default.creatorid
const profanities = require("../profanities.json")
const { makeCase } = require("../util/makeCase.js");
const checkPerm = require("../util/permissions.js");
const notCommand = require("../util/nonCommand.js");
const dmCommands = require("../util/dmCommands.js");

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

  if (message.channel.type === "dm") {
    console.log("dm console");
    dmCommands(bot, message);
    return;
  }

  if (!cmd) {
    if (message.content.startsWith(`${prefix}music`)) return;
    notCommand(bot, message)
    return;
  };

  if (message.content.indexOf(prefix) !== 0) return;

  if (cmd) {
    message.channel.startTyping();
    // const cmdperm = await checkPerms(bot, message, cmd.settings.permission.toLowerCase())
    if (checkPerm(bot, message, cmd.settings.permission.toLowerCase(), true) == false) {
      message.channel.stopTyping();
      removedat(message, cmd);
      return;
    }

    cmd.run(bot, message, args);

    removedat(message, cmd);

    setTimeout(function() {
      message.channel.stopTyping()
    }, 5000);
  };
}