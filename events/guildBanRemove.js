module.exports = (bot, guild, member) => {
  console.log(`${guild.name}, (${guild.id}) has removed ${member.user.tag} from the ban list`);
};