const prefix = require("../config.json").default.prefix
const premiumServers = require("../config.json").premiumServers
const config = require('../config.json');
const search = require('youtube-search');
const Discord = require('discord.js');
const YTDL = require("ytdl-core");
const FFMPEG = require("ffmpeg");
const checkPerm = require("../util/permissions.js");


var servers = {};
var opts = {
  maxResults: 2,
  type: "video",
  //videoDuration: "short",
  key: config.keys ? config.keys.ytapikey : process.env.ytapikey
};

function queueShift(server) {
  server.queueList.shift();
  server.queueNames.shift();
  server.queueAuthor.shift();
  server.queueImage.shift();
  server.queueLength.shift();
  server.queueMessages.shift();
  server.skipNum = 0;
  server.skipUsers = [];
};

function end_Connection(bot, server, connect, msg) {
  if (server.queueList[1]) {
    queueShift(server)
    play(connect, msg, bot)
  } else {
    queueShift(server)
    connect.disconnect()
    console.log(`[PLER] Now stopped playing music in ${msg.guild.name}`)
    let endem = new Discord.RichEmbed()
      .setColor("7289DA")
      .setDescription(`I have now stopped playing in ${connect.channel.name}`)
      .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)

    msg.channel.send({ embed: endem }).then(m => m.delete(25000))
  };
};

function play(connect, msg, bot) {
  let server = servers[msg.guild.id];
  console.log(`[PLER] Now started playing music in ${msg.guild.name}`)

  if (server.queueLength[0] != 1800) {
    let em = new Discord.RichEmbed()
      .setColor("7289DA")
      .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
      .setThumbnail(server.queueImage[0])
      .setDescription(`I will now start playing **${server.queueNames[0]}** in ${connect.channel.name}\n\n**By:** ${server.queueAuthor[0]}\n**Link:** ${server.queueList[0]}\n**Length:** ${server.queueLength[0]}`)
      .setFooter(`Requester: ${server.queueMessages[0].author.tag}`, server.queueMessages[0].author.avatarURL)

    msg.channel.send({ embed: em }).then(m => m.delete(50000))

    server.dispatcher = connect.playStream(YTDL(server.queueList[0], { filter: "audioonly" }), { seek: 0, volume: 1 }) //, bitrate: "auto"});

    server.dispatcher.on("end", function() {
      end_Connection(bot, server, connect, msg)
    });
  } else {
    let em = new Discord.RichEmbed()
      .setColor("7289DA")
      .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
      .setThumbnail(server.queueImage[0])
      .setDescription(`I have skipped **${server.queueNames[0]}** in ${connect.channel.name}\n\n**Reason:** Livestream Error`)

    msg.channel.send({ embed: em }).then(m => m.delete(`50000`))

    end_Connection(bot, server, connect, msg)
  }
};

function removedat(msg) {
  if (msg.channel.type === "dm") return;
  if (!msg.deletable) {
    console.log(`[DEL] Couldn't remove a message in ${msg.guild.name}`)
    return;
  }
  msg.delete();
  console.log(`[DEL] Removed a message in ${msg.guild.name}`)
}

function errorhandle(err) {
  console.log(`[ERROR] ${err}`)
}


module.exports = (bot, message) => {
  if (message.author.equals(bot.user)) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(`${prefix}music`)) return;
  if (message.channel.type == "dm") return;

  const checkPremium = require('../util/checkPremium.js');
  let premium = checkPremium(bot, message, false, false)

  if (premium == false) {
    let premiumem = new Discord.RichEmbed()
      .setColor("7289DA")
      .setAuthor(`${bot.user.username} Premium`, bot.user.avatarURL)
      .setDescription(checkPremium(bot, message, true, true))

    message.channel.send({ embed: premiumem }).then(m => m.delete(55000))
    return;
  }

  var args = message.content.substring(prefix.length + 6).split(" ");

  switch (args[0].toLowerCase()) {
    case "help":
      removedat(message)
      let em = new Discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
        .setDescription("Fine I'm simply a simple musicbot by RHG#0822")
        .addField(`${prefix}help`, `Sends this message.`)
        .addField(`${prefix}play (Youtube link) or (field)`, `Plays a song in the current channel.`)
        .addField(`${prefix}skip`, `Skips the current song`)

      message.channel.send({ embed: em });
      break;
    case "play":
      if (!message.member.voiceChannel) {
        removedat(message)
        message.channel.send(":x: Oh I forgot.. You need to be in a voice channel!")
        break;
      }
      if (!message.member.voiceChannel.joinable || message.member.voiceChannel.full) {
        removedat(message)
        message.channel.send(":x: Looks like I cannot join that voice channel.")
        break;
      }
      if (!args[1]) {
        removedat(message)
        message.channel.send(":x: Umm where's the link?")
        break;
      }
      message.channel.send(`<@${message.author.id}>, I will now process that song name/link!`).then(m => m.delete(25000))
      if (!servers[message.guild.id]) {
        servers[message.guild.id] = { queueList: [], queueNames: [], queueAuthor: [], queueImage: [], queueLength: [], queueMessages: [], skipNum: 0, skipUsers: [] };
      };
      if (!YTDL.validateURL(args[1])) {
        // message.channel.send(":x: Are you sure thats a Youtube link?")
        search(args.slice(1).join(" "), opts, function(err, results) {
          if (err) return console.log(err);

          console.log(`[QUEUE] Added music to ${message.guild.name}'s queue!' `)

          var server = servers[message.guild.id]

          YTDL.getInfo(results[0].link).then(info => {

            if (!servers[message.guild.id]) {
              servers[message.guild.id] = { queueList: [], queueNames: [], queueAuthor: [], queueImage: [], queueLength: [], queueMessages: [] };
            };
            var server = servers[message.guild.id]
            server.queueList.push(results[0].link);
            server.queueNames.push(info.title)
            server.queueAuthor.push(info.author.name)
            server.queueImage.push(info.iurlmq)
            server.queueLength.push(info.length_seconds)
            server.queueMessages.push(message)

            if (!message.guild.voiceConnection) {
              message.member.voiceChannel.join().then(function(connection) { play(connection, message, bot) });
            } else {
              let em = new Discord.RichEmbed()
                .setColor("7289DA")
                .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
                .setThumbnail(info.iurlmq)
                .setDescription(`I have added **${info.title}** to play in ${message.member.voiceChannel.name}\n\n**By:** ${info.author.name}\n**Link:** ${results[0].link}\n**Length:** ${info.length_seconds} Seconds`)
                .setFooter(`Requester: ${message.author.tag}`, message.author.avatarURL)

              message.channel.send({ embed: em }).then(m => m.delete(25000))
            }
            removedat(message)
          });
        });
      } else {

        console.log(`[QUEUE] Added music to ${message.guild.name}'s queue!' `)

        var server = servers[message.guild.id]
        YTDL.getInfo(args[1]).then(info => {
          var server = servers[message.guild.id]
          server.queueList.push(args[1])
          server.queueNames.push(info.title)
          server.queueAuthor.push(info.author.name)
          server.queueImage.push(info.iurlmq)
          server.queueLength.push(info.length_seconds)
          server.queueMessages.push(message)

          if (!message.guild.voiceConnection) {
            message.member.voiceChannel.join().then(function(connection) { play(connection, message, bot) });
          } else {
            let em = new Discord.RichEmbed()
              .setColor("7289DA")
              .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
              .setThumbnail(info.iurlmq)
              .setDescription(`I have added **${info.title}** to play in ${message.member.voiceChannel.name}\n\n**By:** ${info.author.name}\n**Link:** ${args[1]}\n**Length:** ${info.length_seconds} Seconds`)
              .setFooter(`Requester: ${message.author.tag}`, message.author.avatarURL)

            message.channel.send({ embed: em }).then(m => m.delete(25000))
          }
          removedat(message)
        });
      }

      break;
    case "skip":
      removedat(message)
      var server = servers[message.guild.id];
      if (!message.guild.voiceConnection) return
      if (server.skipUsers.indexOf(message.author.id) === -1) {
        server.skipUsers.push(message.author.id);
        server.skipNum = server.skipNum + 1
        if (server.skipNum >= Math.ceil((message.guild.voiceConnection.channel.members.size - 1) / 2)) {
          if (server.dispatcher) server.dispatcher.end()
          message.channel.send(`⏩ ${message.author.tag}, has made us reach the skipping needs!`).then(m => m.delete(25000))
        } else {
          message.channel.send(`⏩ ${message.author.tag}, Your skip was noticed, but you need **${$Math.ceil((message.guild.voiceConnection.channel.members.size - 1) / 2) - server.skipNum}** more people to vote!`).then(m => m.delete(25000))
        }
      } else {
        message.channel.send(`⏩ ${message.author.tag}, You have already voted to skip!`).then(m => m.delete(25000))
      }
      break;
    case "fskip":
      removedat(message)
      if (checkPerm(bot, message, "admins", true) == false) return;
      var server = servers[message.guild.id];
      if (!message.guild.voiceConnection) return
      if (server.dispatcher) server.dispatcher.end()
      break;
    case "stop":
      removedat(message)
      var server = servers[message.guild.id]
      server.queueList = []
      server.queueNames = []
      server.queueAuthor = []
      server.queueImage = []
      server.queueLength = []
      server.queueMessages = []
      server.skipNum = 0
      server.skipUsers = []
      if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
      break;
    case "queue":
      var server = servers[message.guild.id];
      var queue = `**Queue for ${message.guild.name}** [${server.queueNames.length}]\n\n`
      for (var i = 0; i < server.queueNames.length; i++) {
        var temp = `**${i + 1}:** ${i === 0 ? "**(Current Song)**" : ""} ${server.queueNames[i]}\n**Requester:** ${server.queueMessages[i].author.tag}\n\n`
        queue = queue + temp
      }
      let queue_embed = new Discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
        .setDescription(queue)

      message.channel.send({ embed: queue_embed }).then(m => m.delete(55000))
      break;
    case "nowplaying":
      var server = servers[message.guild.id];
      if (!server) { return message.channel.send(`:x: looks like noting is playing right now...`) }
      if (!server.queueList[0]) { return message.channel.send(`:x: looks like noting is playing right now...`) }

      let npem = new Discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
        .setThumbnail(server.queueImage[0])
        .setDescription(`**Now Playing** \n\n**Name:** ${server.queueNames[0]}\n**By:** ${server.queueAuthor[0]}\n**Link:** ${server.queueList[0]}\n**Length:** ${server.queueLength[0]}\n**Requester:** ${server.queueMessages[0].author.tag}`)

      message.channel.send({ embed: npem }).then(m => m.delete(50000))

      break;
  };
  //message.delete();

}