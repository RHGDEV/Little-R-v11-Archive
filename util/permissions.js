const config = require("../config.json");

function sendmsgfeedback(msg, send, deltime) {
  if (send == true) {
    message.channel.send(msg).then(m => m.delete(deltime))
  };
}


module.exports = (bot, message, perm, sendfeedback) => {
  // Creator always has perms!
  if (message.author.id == config.creatorid) {
    return true
  };

  // Guild owner also has perms to everything EXCEPT creator cmds
  if (message.guild.available) {
    if (message.author.id == message.guild.owner.user.id && perm !== "creator") {
      return true
    }
  }

  if (perm == "creator") {
    if (message.author.id !== config.creatorid) {
      sendmsgfeedback(`:x: Invaild permissions! Needed: Creator`, sendfeedback, 25000)
      return false
    };
  };

  if (perm == "admins") {
    // REDO VV to ==> "Manage Roles" and "View Audit Log"!

    if (!message.member.hasPermission(["VIEW_AUDIT_LOG", "MANAGE_ROLES"], false)) {
      sendmsgfeedback(`:x: Invaild permissions! Needed: Admin+`, sendfeedback, 25000)
      return false
    }

     // vv OLD vv (keep just incase!)
    // if (!message.member.roles.some(r => ["RHG", "Admin"].includes(r.name))) {
    //   sendmsgfeedback(`:x: Invaild permissions! Needed: Admin+`, sendfeedback, 25000)
    //   return false
    // };
  };

  if (perm == "all") {
    return true
  };

  return true
};
