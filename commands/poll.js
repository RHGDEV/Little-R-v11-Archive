const discord = require('discord.js');
const ms = require("ms");

module.exports.run = (bot, message, args) => {
  let question = args.slice(1).join(" ")
  let time = args[0]
  if (!args[1]) return message.channel.send(`:x: Invalid Usage! ${require("../config.json").default.prefix}poll "time" "message"`).then(m => m.delete(2500))
  let poll = new discord.RichEmbed()
    .setColor("7289DA")
    .setAuthor(`${bot.user.username} Poll 📊`, bot.user.avatarURL)
    .setDescription(`🗳 <@${message.author.id}>, is asking a poll.\n\n**${question}**`)
    .setFooter(`Time Left: ${ms(ms(time), {long: true})}`)
    .setTimestamp()
  message.channel.send({ embed: poll }).then(m => {
    m.delete(ms(time))
    m.react(`✅`);
    let collect1 = m.createReactionCollector(
      (reaction, user) => reaction.emoji.name === '✅' && user.id !== bot.user.id, { time: ms(time) - 10 });
    m.react(`❎`);
    let collect2 = m.createReactionCollector(
      (reaction, user) => reaction.emoji.name === '❎' && user.id !== bot.user.id, { time: ms(time) - 10 });
    let col1 = 0
    let col2 = 0
    collect1.on('end', c => col1 = c.size);
    collect2.on('end', c => col2 = c.size);

    //collect1.on('collect', r => console.log(`Collected1 ${r.emoji.name}`));
    //collect2.on('collect', r => console.log(`Collected2 ${r.emoji.name}`));
    setTimeout(function() {
      let poll = new discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`${bot.user.username} Poll 📊`, bot.user.avatarURL)
        .setDescription(`🗳 Recent poll for\n**${question}**\n\n⌛ **Total Time:** ${ms(ms(time), {long: true})}\n\n**Result:**\n✅  ${col1}\n❎  ${col2}`)
        // .setFooter(`Time Left: ${ms(ms(time), {long: true})}`)
        .setTimestamp()
      message.channel.send({ embed: poll }) //.then(m => m.delete(15000))
    }, ms(time))
  });
};

module.exports.help = {
  name: "poll",
  usage: `[time] [question]`,
  information: "Start a poll with a queston"
}

module.exports.settings = {
  permission: "Admins",
  deleteresponder: true,
  category: "Fun"
}