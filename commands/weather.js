const w = require('weather-js'),
     discord = require(`discord.js`);


module.exports.run = (bot, message, args) => {
	loc = message.content.substring(10);
	if (!loc) {
		message.channel.sendMessage("You need to supply a City!");
		return;
	}
	try {
	w.find({search: loc, degreeType: 'F'}, function(err, result) {
	if (err) {
		message.channel.sendMessage(err);
     }
     let area = result[0];

    	let embed = new discord.RichEmbed()
      .setColor(message.guild.me.displayHexColor !='#000000' ? message.guild.me.displayHexColor : "7289DA")
      .setAuthor(`☁ Weather for ${area.location.name}`)
        .setFooter(bot.user.username, bot.user.avatarURL)
      .setDescription(`
**Temperature:** ${area.current.temperature}°F
**Feels Like:** ${area.current.feelslike}°F
**Clouds:** ${area.current.skytext}
**Humidity:** ${area.current.humidity}%
**Wind Speed:** ${area.current.winddisplay}
         `);
    message.channel.send({ embed }).then(m => m.delete(25000));
  });
	} catch(err) {
    msg.channel.createMessage("Idk why this is broken tbh 😭").then(m => m.delete(25000));
	}
};

module.exports.help = {
     name: "weather",
     usage: `[location]`,
     information: "Let's get the weather infomation of the current area!"
};

module.exports.settings = {
     permission: "All",
     deleteresponder: true,
     category: "Info"
};
