module.exports = (bot, member) => {

member.send(`Welcome to the server!`)
const channel = member.guild.channels.find('name', 'member-log');
if (!channel) return;

channel.send(`Welcome to the server, [@${member.id}]`);
});
