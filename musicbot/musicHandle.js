const prefix = require("../config.json").default.prefix
const premiumServers = require("../config.json").premiumServers
const config = require('../config.json');
const Discord = require('discord.js');
const YTDL = require("ytdl-core");
const FFMPEG = require("ffmpeg");
const checkPerm = require("../util/permissions.js")
const YouTube = require('simple-youtube-api')

const YTapi = new YouTube(process.env.ytapikey ? process.env.ytapikey : require("../config.json").keys.ytapikey)

var servers = {};

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

  //if (server.queueLength[0] !== 1800) {
  if (server.queueLength[0] !== "0:0:0") {
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

function parseTime(hour, min, seconds) {

  var hourt = hour !== 0 ? `${hour}` : ""
  var mint = min !== 0 ? `${min}` : ""
  var secondst = seconds !== 0 ? `${seconds}` : ""

  hourt = hourt < 10 && hourt !== 0 ? `0${hourt}:` : `${hourt}`
  mint = mint < 10 && mint !== 0 ? `0${mint}:` : `${mint}`
  secondst = secondst < 10 && secondst !== 0 ? `0${secondst}` : `${secondst}`

  return `${hourt==""?"":hourt}${mint==""?"":mint}${secondst==""?"":secondst}`
}

function parseUpload(bot, server, link, message, playlist) {
  //  YTDL.getInfo(link).then(info => {
  YTapi.getVideo(link).then(info => {

      let length = parseTime(info.duration.hours, info.duration.minutes, info.duration.seconds)
      if (length == "0:0:0") {
        if (!playlist) {
          let em = new Discord.RichEmbed()
            .setColor("7289DA")
            .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
            .setThumbnail(info.thumbnails.default.url)
            .setDescription(`I could not add **${info.title}** to play in ${message.member.voiceChannel.name}\n\n**Reason:** Livestream`)
            .setFooter(`Requester: ${message.author.tag}`, message.author.avatarURL)

          message.channel.send({ embed: em }).then(m => m.delete(5000))
          return
        }
      }
      //console.log(info);
      server.queueList.push(link)
      server.queueNames.push(info.title)
      server.queueAuthor.push(info.channel.title)
      server.queueImage.push(info.thumbnails.default.url)
      server.queueLength.push(length)
      server.queueMessages.push(message)

      if (!message.guild.voiceConnection) {
        message.member.voiceChannel.join().then(function(connection) { play(connection, message, bot) });
      } else {
        if (!playlist) {
          let em = new Discord.RichEmbed()
            .setColor("7289DA")
            .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
            .setThumbnail(info.thumbnails.default.url)
            .setDescription(`I have added **${info.title}** to play in ${message.member.voiceChannel.name}\n\n**By:** ${info.channel.title}\n**Link:** ${link}\n**Length:** ${length} `)
            .setFooter(`Requester: ${message.author.tag}`, message.author.avatarURL)

          message.channel.send({ embed: em }).then(m => m.delete(10000))
        }
      }
    })
    .catch(console.log);
}


module.exports = (bot, db, message) => {
  if (message.author.bot) return
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

      if (!args[1].match(/^https?:\/\/(www.youtube.com|youtube.com)/)) {
        // message.channel.send(":x: Are you sure thats a Youtube link?")
        var server = servers[message.guild.id]

        YTapi.searchVideos(args.slice(1).join(" "), 5).then(videos => {
          console.log(videos)
          let choice = new Discord.RichEmbed()
            .setColor("7289DA")
            .setAuthor(`${bot.user.username} Music`, bot.user.avatarURL)
            .setDescription(`Please provide a value to select one of the search results ranging from 1-5`)
            .setFooter(`Cancelling in 10 seconds`)
            .setTimestamp()
            .addField(`**1.** ${videos[0].title}`, `[${videos[0].channel.title}](https://www.youtube.com/channel/${videos[0].channel.id}) `)
            .addField(`**2.** ${videos[1].title}`, `[${videos[1].channel.title}](https://www.youtube.com/channel/${videos[1].channel.id}) `)
            .addField(`**3.** ${videos[2].title}`, `[${videos[2].channel.title}](https://www.youtube.com/channel/${videos[2].channel.id}) `)
            .addField(`**4.** ${videos[3].title}`, `[${videos[3].channel.title}](https://www.youtube.com/channel/${videos[3].channel.id}) `)
            .addField(`**5.** ${videos[4].title}`, `[${videos[4].channel.title}](https://www.youtube.com/channel/${videos[4].channel.id}) `)

          message.channel.send({ embed: choice }).then(m => { m.delete(10000) })


          message.channel.awaitMessages(m => m.content > 0 && m.content < 6, {
              max: 1,
              time: 10000,
              errors: ['time']
            })
            .then(collected => {
              collected.first().delete()
              removedat(message)

              //  message.channel.send(`Okay I'll now add **${videos[collected.first().content-1].title}**`).then(m => m.delete(5000))
              parseUpload(bot, server, `https://www.youtube.com/watch?v=${videos[collected.first() - 1].id}`, message)
            })
            .catch(err => {
              console.log("error");
              console.log(err);
              //console.log(collected.first().author.id);
              message.channel.send(`** Canceled **`).then(m => m.delete(5000))
              removedat(message)
            });

        })
      } else {
        if (args[1].match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
          console.log("playlist");
          YTapi.getPlaylist(args[1]).then(list => {
            message.channel.send(`⏱ Parsing Playlist: **${list.title}**\nPlease give some time. This also includes the server's parsing power and the ammount of videos provided.`)
            list.getVideos().then(videos => {
              for (const video of Object.values(videos)) {
                YTapi.getVideoByID(video.id).then(vid => {
                  //console.log(vid);
                  parseUpload(bot, servers[message.guild.id], `https://www.youtube.com/watch?v=${vid.id}`, message, true)
                })
              }
              //console.log(list);
              message.channel.send(`✅ Playlist: **${list.title}** [${videos.length === 50 ? '50+' : videos.length} videos] has been added to the queue!`)
            })
          });
        } else {
          console.log("no playlist");
          console.log(`[QUEUE] Added music to ${message.guild.name}'s queue!'`)
          removedat(message)
          parseUpload(bot, servers[message.guild.id], args[1], message)
        }
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
          message.channel.send(`⏩ ${message.author.tag}, Your skip was noticed, but you need **${Math.ceil((message.guild.voiceConnection.channel.members.size - 1) / 2) - server.skipNum}** more people to vote!`).then(m => m.delete(25000))
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
      removedat(message)
      var server = servers[message.guild.id];
      if (!server) {
        return
      } else if (server.queueNames.length == 0) {
        return
      }

      var queue = ` **Queue for ${message.guild.name}** [ ${server.queueNames.length} song${server.queueNames.length>1?"s":""} total ]\n\n `
      var queueLength = server.queueNames.length > 5 ? 5 : server.queueNames.length
      for (var i = 0; i < queueLength; i++) {
        var temp = ` ${i + 1}: ${i === 0 ? "*(Current Song)*":""} ${server.queueNames[i].includes("*")?server.queueNames[i].replace('*', ''):server.queueNames[i]}\n **Requester:** ${server.queueMessages[i].author.tag }\n\n`
        queue = queue + temp
      }
      if (queueLength == 5 && server.queueNames.length > 5) {
        var addition = `***+ ${server.queueNames.length-5} more songs***`
        queue = queue + addition
      }
      let queue_embed = new Discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`${bot.user.username } Music `, bot.user.avatarURL)
        .setDescription(queue)
        .setThumbnail(message.guild.iconURL !== null ? message.guild.iconURL : "https://maxcdn.icons8.com/Share/icon/Logos//discord_logo1600.png")

      message.channel.send({ embed: queue_embed }).then(m => m.delete(55000))
      break;
    case "nowplaying":
      removedat(message)
      var server = servers[message.guild.id];
      if (!server) { return message.channel.send(`: x: looks like noting is playing right now...`) }
      if (!server.queueList[0]) { return message.channel.send(`: x: looks like noting is playing right now...`) }

      let npem = new Discord.RichEmbed()
        .setColor("7289DA")
        .setAuthor(`${bot.user.username } Music `, bot.user.avatarURL)
        .setThumbnail(server.queueImage[0])
        .setDescription(`**Now Playing** \n\n **Name: ** ${server.queueNames[0]}\n **By: ** ${server.queueAuthor[0]}\n **Link: ** ${server.queueList[0]}\n **Length:** ${server.queueLength[0]}\n **Requester: ** ${server.queueMessages[0].author.tag}`)

      message.channel.send({ embed: npem }).then(m => m.delete(50000))
      break;
  };
  //message.delete();
}