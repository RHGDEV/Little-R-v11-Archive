
module.exports.run = (bot, message, args) => {
  // ⚡ 🌩
  let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;
  let member = message.guild.member(user);

  message.channel.send(`🌩 A wild cloud appears...`).then(m => {
    setTimeout(function() {
      if (user.id == message.author.id) {
        m.edit(`⚡ Oh no looks like ${message.author} has striked himself with lighting!`);
      } else {
        m.edit(`⚡ ${message.author.username} has zapped ${user} with lighting!`);
      }
      m.delete(5000);
    }, 3000);
  });
};

module.exports.help = {
  name: "smite",
  usage: ``,
  information: "Makes a wild cloud appear and smites the valid user."
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
};