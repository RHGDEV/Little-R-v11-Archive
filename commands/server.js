const Discord = require('discord.js'),
moment = require('moment'),
contentFilter = ['**None** - Don\'t scan any message. ', 'Scan messages of members without a role', 'Scan messages sent by all members'],
verificationLevel = ['**None** - unrestricted', '**Low** - must have verified email on account', '**Medium** - must be registered on Discord for longer than 5 minutes', '**High** - 	(╯°□°）╯︵ ┻━┻ - must be a member of the server for longer than 10 minutes', '**Very High** - ┻━┻ミヽ(ಠ益ಠ)ﾉ彡┻━┻ - must have a verified phone number'];

module.exports.run = (bot, message, args) => {
  const guild = args[0]?bot.guilds.get(args[0]):message.guild;
  if (!guild) {
    message.channel.send(`:x: Guild not found.`).then(m=>{m.delete(10000);});
    return;
  }
  const channels = guild.channels.map(ty => ty.type),
  members = guild.members.map(u => u.user),
  presences = guild.presences.map(st => st.status),
  emojis = guild.emojis.map(emoji => emoji.name),
  roles = guild.roles.map(role => role.name);

  var textChannels = 0,
  voiceChannels = 0,
  member = 0,
  robots = 0,
  emoji = [],
  role = [],
  onlineMembers = 0,
  idleMembers = 0,
  dndMembers = 0,
  offlineMembers = 0;

  for (const i in presences) {
    if (presences[i] === 'online') {
      onlineMembers++;
    } else if (presences[i] === 'offline') {
      offlineMembers++;
    } else if (presences[i] === 'idle') {
      idleMembers++;
    } else if (presences[i] === 'dnd') {
      dndMembers++;
    }
  }

  for (const i in members) {
    if (members[i].bot == true) {
      robots++;
    } else {
      member++;
    }
  }

  for (const i in channels) {
    if (channels[i] === 'text') {
      textChannels++;
    } else {
      voiceChannels++;
    }
  }

  for (const i in emojis) {
    emoji.push(emojis[i]);
  }
  for (const i in roles) {
    if (!roles[i].includes("@everyone")){
     role.push(roles[i]);
    }
  }

  if (emoji == "") {
    emoji.push(`No emojis`);
  }
  if (role == "") {
    role.push(`No roles.`);
  }
  //for
  //guild.roles.map(role => role.name)

  let server = new Discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`Server Info`)
    .setThumbnail(message.guild.iconURL?message.guild.iconURL:"https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png")
    .setFooter(`Server info | Server's bot percent: ${(members.length / robots).toFixed(2)}`, bot.user.avatarURL)
    .addField('Server Name', `**${guild.name}**\n(${guild.id})`, true)
    .addField('Owner', `**${guild.owner.user.tag}**\n(${guild.owner.user.id})`, true)
    .addField(`Members [#${guild.memberCount}]`, `**People:** ${member}\n**Bots:** ${robots}\n\n<:online:397932529702928385> ${onlineMembers}\n<:idle:397932529925226496> ${idleMembers}\n<:dnd:397932529665048592> ${dndMembers}\n<:invisible:397932529761386497> ${offlineMembers}`, true)
    .addField(`Channels [#${guild.channels.array().length}]`, `**Text Channels:** ${textChannels}\n**Voice Channels:** ${voiceChannels}`, true)
    .addField(`Emojis [#${guild.emojis.size}]`, emoji.join(', '), true)
    .addField(`Roles [#${guild.roles.size}]`, role.join(', '), true)
    .addField('Created At', moment(guild.createdTimestamp).format('MMMM Do YYYY [@] HH:mm:ss [UTC]Z'), true)
    .addField('Region', `**${guild.region}**`, true)
    .addField('Verification Level', verificationLevel[guild.verificationLevel], false)
    .addField('Explicit Content Filter', contentFilter[`${guild.explicitContentFilter}`], false)
    .setImage(guild.splashURL?guild.splashURL:null);

  message.channel.send({ embed: server }).then(m => m.delete(30000));
};

module.exports.help = {
  name: "server",
  usage: ``,
  information: "Get features of the current server."
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Info"
};