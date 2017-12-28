const config = require("../config.json");

function sendmsgfeedback(message, msg, send, deltime) {
  if (send == true) {
    message.channel.send(msg).then(m => m.delete(deltime))
  };
}


module.exports = (bot, message, perm, sendfeedback) => {
  // Creator always has perms!
  if (message.author.id == config.default.creatorid) {
    return true
  };

  // Guild owner also has perms to everything EXCEPT creator cmds
  if (message.guild.available) {
    if (perm !== "creator") {
      if (message.author.id == message.guild.owner.user.id && perm !== "creator") {
        return true
      }
    }
  }

  if (perm == "creator") {
    if (message.author.id !== config.default.creatorid) {
      sendmsgfeedback(message, `:x: Invaild permissions! Needed: Creator`, sendfeedback, 25000)
      return false
    };
  };

  if (perm == "admins") {
    // REDO VV to ==> "Manage Roles" and "View Audit Log"!

    if (!message.member.hasPermission(["VIEW_AUDIT_LOG", "MANAGE_ROLES"], false, true, true)) {
      sendmsgfeedback(message, `:x: Invaild permissions! Needed: Admin+`, sendfeedback, 25000)
      return false
    }

    // vv OLD vv (keep just incase!)
    // if (!message.member.roles.some(r => ["RHG", "Admin"].includes(r.name))) {
    //   sendmsgfeedback(message, `:x: Invaild permissions! Needed: Admin+`, sendfeedback, 25000)
    //   return false
    // };
  };

  if (perm == "all") {
    return true
  };

  return true
};