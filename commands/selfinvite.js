module.exports.run = (bot, message, args) => {
  if (!args) return message.channel.send(`Ehh I can't really create an invite for thatguild.`);
  let guild = bot.guilds.get(args[0]);
  if (!guild) return message.channel.send(`Ehh I can't really create an invite for that guild.`);
  guild.fetchInvites().then(invites =>{
    if (invites.first()) {
      message.channel.send(`**Invite for ${guild.name}**\n\n**Invite:** ${invites.first().code}\n**Channel:** ${invites.first().channel}`);
      return;
    } else {
      // let invitespush = [];
      // bot.guilds.get(args[0]).channels.forEach(channel => {
      //   if (channel.type == "text") {
      //     channel.createInvite({
      //       temporary: false,
      //       maxAge: 100
      //       //maxUses: 1
      //     }).then(invite => {
      //       invitespush.push(invite.url);
      //     });
      //   }
      // });
      // message.channel.send(`**Invites for ${guild.name}**\n\n${invitespush}`);
    }
  });
};

module.exports.help = {
  name: "selfinvite",
  usage: ``,
  information: "I'll try to get an invite from a server."
};

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Moderation"
};