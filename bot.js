const eris = require('eris');
require('dotenv').config();
const PREFIX = 'b!';

// Create a Client instance with our bot token.
const bot = new eris.Client(process.env.API_TOKEN || '');

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('The bird is awake.');
   bot.editStatus("online",{name: "type b!help", type: 0});
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
   const botWasMentioned = msg.mentions.find(
       mentionedUser => mentionedUser.id === bot.user.id,
   );

   if (botWasMentioned) {
       try {
           await msg.channel.createMessage('cheep cheep');
       } catch (err) {
           // There are various reasons why sending a message may fail.
           // The API might time out or choke and return a 5xx status,
           // or the bot may not have permission to send the
           // message (403 status).
           console.warn('Failed to respond to mention.');
           console.warn(err);
       }
   }
   //Commands
   if(msg.content.startsWith(PREFIX)){
       var commandTxt = msg.content.substring(2);
       if(commandTxt == "help"){
           msg.channel.createMessage("LIST OF COMMANDS:\nb!feed: feed birbo\nb!unfeed: unfeed birbo");
       }
       if(commandTxt == "feed"){
           msg.channel.createMessage("aw yiss seed for me");
       }
       if(commandTxt == "unfeed"){
           msg.channel.createMessage("hey what the fuck");
       }
   }
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();
