const cheerio = require('cheerio'),
snekfetch = require('snekfetch'),
querystring = require('querystring');

module.exports.run = (bot, message, args) => {
  if (!args[0]) {
    message.channel.send(`:x: You need a item to search google.`);
    return;
  }

  let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content)}`;
  message.channel.send(`Searching google for ${args.join(' ')}...`).then(m => m.delete(5000));
  return snekfetch.get(searchUrl).then((result) => {

    // Cheerio lets us parse the HTML on our google result to grab the URL.
    let $ = cheerio.load(result.text);
    let googleData = $('.r').first().find('a').first().attr('href');

    googleData = querystring.parse(googleData.replace('/url?', ''));
    message.channel.send(`Results found on google for ${args.join(' ')}:\n${googleData.q}`).then(m => m.delete(10000));

  }).catch((err) => {
    message.channel.send(`No results found on google for ${args.join(' ')}...`).then(m => m.delete(10000));
  });
};

module.exports.help = {
  name: "google",
  usage: `(string)`,
  information: "Let's search google!"
};

module.exports.settings = {
  permission: "All",
  deleteresponder: true,
  category: "Fun"
};