module.exports.run = (bot, message, args) => {
  if (!args) return message.channel.send(`No valid id has been given.`).then(m => m.delete(5000))
  let guild = bot.guilds.find("id", args[0])
  if (!guild) return message.channel.send(`You gave me a id of a guild, but I didn't find it..`).then(m => m.delete(5000))

  message.channel.send(`**Timeouts in 15 seconds**\n\nI have found a guild called **${guild.name}**, so do you really want me to leave it?\n\n__*Reply with Yes or don't reaply at all.*__`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content.toLowerCase() === 'yes', {
          max: 1,
          time: 15000,
          errors: ['time'],
        })
        .then((collected) => {
          let yes = collected.first().content
          message.channel.send(`Okay I'll now leave  **${guild.name}**, (*${guild.id}*)`).then(m => m.delete(5000))
          collected.first().delete(0)
          m.delete()
        })

        .catch(() => {
          message.channel.send(`No message`).then(m => m.delete(5000))
          m.delete()
        });
    });
}

module.exports.help = {
  name: "gleave",
  usage: ``,
  information: "Leaves the guild if a valid guild id is given."
}

module.exports.settings = {
  permission: "Creator",
  deleteresponder: true,
  category: "Moderation"
}