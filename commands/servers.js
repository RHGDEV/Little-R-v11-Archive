/*jshint -W027 */

const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  const Server = message.guild,
   Channel = message.channel,
   MSG = message.content,
   LANG = message.lang;

  //-------MAGIC----------------

  emb = new Discord.RichEmbed();
  emb.title = "Server Leaderboards";
  emb.description = "Servers sort by Member Count: No Servers with bot count > 15%";
  
  var rankItem = [],
  ranked = [],
  iter = 0,
  aiter = 0,
  baiter = 0;
  bot.guilds.forEach(i => {
    iter++;
    aiter = (i.members.size + aiter);
    let botamt = i.members.filter(m => m.user.bot).size;
    baiter = ((i.members.size - i.members.filter(m => m.user.bot).size) + baiter);
    var psent = (botamt / i.members.size) * 100;
    if (psent >= 15) return;

    if (i.id == "140487710727995392") return;
    rankItem.exp = i.members.size;
    rankItem.level = flag(i.region);
    rankItem.name = (i.name);
    rankItem.id = (i.id);

    rankItem.bots = (botamt);
    ranked.push(rankItem);
    rankItem = [];
  });
  emb.setColor('#da5bae');
  emb.setAuthor(bot.user.username, bot.user.avatarURL);

  emb.setFooter("Mean Server Size: " + (aiter / iter).toFixed(2) + " || Nonbots: " + (baiter / iter).toFixed(2));

  var medals = [':first_place: 1st',
    ':second_place: 2nd',
    ':third_place: 3rd',
    ':medal: 4th',
    ':medal: 5th'
  ];
  console.log("WALRUS");
  for (i = 0; i < ranked.length; i++) {
    if (i < 5) {
      console.log(ranked[i]);
      console.log(medals[i]);
      emb.addField(medals[i], "```" + ranked[i].name + "``` \n  ID - " + ranked[i].id, false);
      emb.addField('Region :' + ranked[i].level, '**' + ranked[i].exp + '** Members', true);
      var parsent = (ranked[i].bots / ranked[i].exp) * 100;
      emb.addField("Bots", ranked[i].bots + " " + " (" + parsent.toFixed(2) + "%)", true);
    }
  }
  message.channel.send({ embed: emb });

  function flag(input) {
    let R = input;
    switch (true) {
      case R.includes("eu-"):
        return ":flag_eu: " + R.substr(3)[0].toUpperCase();
        break;
      case R.includes("us-"):
        return ":flag_us: " + R.substr(3)[0].toUpperCase();
        break;
      case R.includes("brazil"):
        return ":flag_br:";
        break;
      case R.includes("london"):
        return ":flag_gb:";
        break;
      case R.includes("singapore"):
        return ":flag_sg:";
        break;
      case R.includes("hongkong"):
        return ":flag_hk:";
        break;
      case R.includes("russia"):
        return ":flag_ru:";
        break;
      case R.includes("sydney"):
        return ":flag_au:";
        break;
      default:
        return ":map: " + R;
        break;
    }
  }
};

module.exports.help = {
  name: "servers",
  usage: ``,
  information: ""
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "SocialHIDDEN"
};