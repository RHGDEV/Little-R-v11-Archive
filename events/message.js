const config = require("../config.json");
const prefix = config.prefix
const creatorid = config.creatorid
const logid = config.clogid
//const profanities = require("profanities")
const profanities = require("../profanities.json")

module.exports = (bot, message, commands) => {
  let mArray = message.content.split(" ");
  let args = mArray.slice(1);

  let cmd = commands.get(mArray[0].slice(prefix.length));
    if(message.author.bot) return;
   // message.react("✅")
    if(message.channel.type === "dm"){
		return;
    }
    if(!cmd){
      if(message.channel.name == "photos"){
        if(message.attachments.size === 0){
          message.channel.send(`<@${message.author.id}>, You're not allowed to talk in a photo only channel!`).then(m => m.delete(10000))
          message.delete(2500)
          return;
        }
      }

      for (x = 0; x < profanities.length; x++) {
	  if (message.cleanContent.toLowerCase().includes(profanities[x].toLowerCase())) {
       // if (message.content.toLowerCase() == profanities[x].toLowerCase()) {
          console.log(`[Profanity] ${message.author.username}, said ${profanities[x]} in the ${message.channel.name} channel!`)
          message.channel.send(`<@${message.author.id}>, Please do not use profanity in this server!`).then(m => m.delete(10000))
          message.delete(500)
          return;
        }
      }

    }


    if(message.content.indexOf(config.prefix) !== 0) return;

    if (!message.channel.topic) {
      var topic = " "
    } else {
      var topic = message.channel.topic
    }

    if(cmd){
      if (cmd.settings.permission.toLowerCase() == "offline") return console.log("Command Offline")

      message.channel.startTyping();
     // message.channel.setTopic('👉 Analizing command...')

     if (cmd.settings.permission.toLowerCase == "creator") {
       if (!message.author.id == config.creatorID) {

         message.channel.send(":x: Invaild permissions! Needed: Creator").then(m => m.delete(2500))
         console.log(`${message.author.username}#${message.author.discriminator} has tried to run the command ${cmd.help.name}`);
         message.channel.stopTyping();

         if (cmd.settings.deleteresponder) {
           if (!message.deletable) return console.log("Unable to remove message.")
           message.react("❌")
           setTimeout(function() {
             message.delete()
           }, 3000)
         }
         return;
       }
     }

     if (cmd.settings.permission.toLowerCase == "admins") {
       if(!message.member.roles.some(r=>["RHG", "Admin"].includes(r.name))) {
         message.channel.send(":x: Invaild permissions! Needed: Admin+").then(m => m.delete(2500))
         console.log(`${message.author.username}#${message.author.discriminator} has tried to run the command ${cmd.help.name}`);
         message.channel.stopTyping();

         if (cmd.settings.deleteresponder) {
           if (!message.deletable) return console.log("Unable to remove message.")
           message.react("❌")
           setTimeout(function() {
             message.delete()
           }, 3000)
         }
         return;
       };
     }
      console.log(`${message.author.username}#${message.author.discriminator} has ran the command ${cmd.help.name}`)
      //console.log(`MSG | NAME: ${message.author.username} | MSG: ${message.content} | GUILD: ${message.guild} | CHANNEL: ${message.channel.name}`);

       cmd.run(bot, message, args);

       if (cmd.settings.deleteresponder) {
         if (!message.deletable) return console.log("Unable to remove message.")
         message.react("✅")
         setTimeout(function() {
           message.delete()
     		}, 3000)
       }
       setTimeout(continueExecution, 5000);

       function continueExecution() {
         message.channel.stopTyping();
         if (topic == " ") {
          // message.channel.setTopic(" ")
         } else {
           //message.channel.setTopic(topic)
         };
       }

    };
}
