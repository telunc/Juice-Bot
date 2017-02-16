/*
VARIABLES DONT TOUCH
*/

//Discord variables
const Discord = require('discord.js');
const bot = new Discord.Client();
//Files
const commands = require("../Commands/General.js");
const acommands = require("../Commands/Admin.js");
const scommands = require("../Commands/Server.js");
const gcommands = require("../Commands/Google.js");
const config = require('../config.json');
//Config Settings
const token = config.token;
const version = config.version;
const defaultPrefix = config.prefix;
//Web
const urban = require('urban');
const Cleverbot = require("cleverbot-node");
const cbot = new Cleverbot();
const google = require("google")
//Other
const figlet = require('figlet');
const cowsay = require("cowsay");
const fs=require('fs');
const ownerid = config.ownerId;

/*
CODE! DONT TOUCH UNLESS YOUR NOT DUMB!!!!!
*/

try {
/*
Cleverbot
*/
Cleverbot.prepare(function(){
bot.on("message", msg =>{
        var mention = "<@" + bot.user.id + ">";

        var mentionNick = "<@!" + bot.user.id + ">";

        if(msg.content.substring(0,mention.length) === mention){
            var chat = msg.content.substring(mention.length, 99999);
            cbot.write(chat, function (response) {
                msg.reply(response.message);
            });
        }
        if(msg.content.substring(0,mentionNick.length) === mentionNick){
  					 var chat2 = msg.content.substring(mention.length, 99999);
            cbot.write(chat2, function (response) {
                msg.reply(response.message)
            });
        }
    });
});
/*
End of Cleverbot
*/
/*
File read 
*/
bot.on("message", msg => {
var input = msg.content.toLowerCase();
if (msg.author.bot){

}else{
if(msg.channel.type === "dm" && input.startsWith("")){
      msg.channel.sendMessage('Cant do commands in DM')
    }else{
	
  let customPrefixes = JSON.parse(fs.readFileSync('prefixes.json'));  
  msg.guild.prefix = customPrefixes[msg.guild.id] || defaultPrefix;
  msg.guild.constructor.prototype.setPrefix = function (prefix) {
    if (!prefix) throw new ReferenceError('Cannot set prefix to an empty string');
    if (prefix === defaultPrefix) delete customPrefixes[this.id];
    else customPrefixes[this.id] = prefix;
    fs.writeFileSync('prefixes.json', JSON.stringify(customPrefixes));
  };
  if (!input.startsWith(msg.guild.prefix))return;
  var input = msg.content.toLowerCase().replace(msg.guild.prefix, "");

  for(var x of Object.keys(commands)){
    if(input.startsWith(x)){
      commands[x].process(bot,msg,http,urban);
      break;
    }
  }
  for(var x of Object.keys(acommands)){
      if(input.startsWith(x)){
        acommands[x].process(bot,msg, Discord,ownerid);
        break;
      }
    }
 for(var x of Object.keys(scommands)){
      if(input.startsWith(x)){
        scommands[x].process(bot,msg,fs,Discord,ownerid);
        break;
      }
    }
    for(var x of Object.keys(gcommands)){
      if(input.startsWith(x)){
        gcommands[x].process(bot,msg,google,Discord);
        break;
      }
    }
}
}
});
/*
End of file Read
*/
/*
Prefix notifier
*/
bot.on("message", msg =>{
    var input = msg.content.toLowerCase();
    if(msg.channel.type === "dm" && input.startsWith("")){

    }else{
if(input.startsWith("prefix")){
msg.reply(`Server prefix ${msg.guild.prefix}`)
}}
});
/*
End of prefix notifier
*/
/*
Other Events
*/
bot.on("guildCreate", (guild) => {
    console.log(bot.user.username + " was invited to and joined " + guild.name);
});

//End Of other events

/*
Login
*/
bot.login(token);}catch(err){
  console.log(err);
}

bot.on('ready', () => {
    console.log(`${bot.user.username} ready to server ${bot.users.size} online members in ${bot.guilds.size} servers!`);
  bot.user.setGame(`Say prefix for server prefix`)
});

/*
End of file
*/
