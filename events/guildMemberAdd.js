module.exports = (bot, member) => {
console.log(`Looks like ${member.user.username} wants to be close to us.`);
return // SOON
member.send(`Welcome to the server!`)
const channel = member.guild.channels.find('name', 'member-log');
if (!channel) return;

channel.send(`Welcome to the server, [@${member.id}]`);
};
