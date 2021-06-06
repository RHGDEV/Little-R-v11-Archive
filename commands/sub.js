const config = require("../config.json"),
aRoles = config.avaibleroles;

module.exports.run = (bot, message, args) => {
  if (!args[0]) {

    var msgArray = [];
    msgArray.push(`= Subscribable Roles =\n[use ${config.prefix}sub <Role Name> to subscribe/unsubscribe to it.]\n`);
    aRoles.forEach((role, i) => {
      msgArray.push(`#${i+1} - ${role}`);
    });
    if (msgArray == `= Subscribable Roles =\n[use ${config.prefix}sub <Role Name> to subscribe/unsubscribe to it.]\n`) {
      msgArray.push(`[ == Looks like there's no subscribable roles. ==]`);
    }
    message.channel.send(msgArray, { code: 'asciidoc' }).then(m => m.delete(15000));

    return;
  }

  let wantedRole = args[0].toLowerCase();
  let gm = message.member;
  aRoles.forEach((role, i) => {
    if (role.toLowerCase() == wantedRole) {
      let wRole = message.guild.roles.find("name", role);
      if (!wRole) return message.channel.send("Some error has happen").then(m => m.delete(2500));
      if (!gm.roles.find("id", wRole.id)) {
        gm.addRole(wRole.id);
        setTimeout(function() {
          if (gm.roles.find("id", wRole.id)) {
            message.channel.send(`${message.author}, you are now subscribed to ${wRole.name}!`).then(m => m.delete(5000));
          } else {
            message.channel.send(`${message.author}, unable to subscribe to ${wRole.name}!`).then(m => m.delete(5000));
          }
        }, 500);
        return;
      } else {
        gm.removeRole(wRole.id);
        setTimeout(function() {
          if (!gm.roles.find("id", wRole.id)) {
            message.channel.send(`${message.author}, you are now unsubscribed to ${wRole.name}!`).then(m => m.delete(2500));
          } else {
            message.channel.send(`${message.author}, unable to unsubscribe to ${wRole.name}!`).then(m => m.delete(2500));
          }
        }, 500);
        return;
      }
    }
  });
  //	message.channel.send(`${message.author}, I'm not allowed to give that role to you.`)
};

module.exports.help = {
  name: "sub",
  usage: `(role)`,
  information: "Subscribe / Unsubscribe from a role"
};

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Fun"
};