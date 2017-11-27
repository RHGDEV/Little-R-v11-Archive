const config = require("../config.json");

module.exports = (bot, message, perm) => {
  if (perm == "creator") {
    if (message.author.id !== config.creatorid) {
      message.channel.send(":x: Invaild permissions! Needed: Creator").then(m => m.delete(25000))
      return false
    };
  };

  if (perm == "admins") {
    if (!message.member.roles.some(r => ["RHG", "Admin"].includes(r.name))) {
      message.channel.send(":x: Invaild permissions! Needed: Admin+").then(m => m.delete(25000))
      return false
    };
  };

  if (perm == "all") {
    return true
  };
  
  return true
};
