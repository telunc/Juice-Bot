var funcs = {};
const startTime = Date.now();
const config = require('../config.json');

const Discord = require('discord.js')
const urban = require('urban');
	funcs.help = {
		"usage" : "$$help",
		"description" : "Gets all the commands",
		"process" : function(bot,msg) {
		    var embed = new Discord.RichEmbed()
  			embed.setTitle(`Juicebot Commands`)
			embed.setDescription(`Hello ${msg.author.username}, I am ${bot.user.username} and these are my commands!`)
			embed.setColor(65280)
			embed.addField("Help Commands",
		    `${msg.guild.prefix}Help - Shows all the commands\n`,false)
			embed.addField("Server Commands",
			`${msg.guild.prefix}Prune - Delete an ammount of messages between 1 and 100\n` +
			`${msg.guild.prefix}Server - Show the server info\n`+
			`${msg.guild.prefix}Setprefix - Change the server prefix\n`, false)
			embed.addField("User Commands",
			`${msg.guild.prefix}Cowsay - Makes a cowsay what you say\n` +
			`${msg.guild.prefix}Acsii - Turns what you say into ascii art\n` +
			`${msg.guild.prefix}Userinfo - Gets info of you or someone mentioned\n` +
			`${msg.guild.prefix}Ping - Guess what? - PONG!!\n` +
			`${msg.guild.prefix}Rip - Rip(EX. ${msg.guild.prefix}rip anything)\n` +
			`${msg.guild.prefix}Urban - Search Urban Dictionary for a term\n` +
			`${msg.guild.prefix}Stats - Gets the bots stats\n` +
			`${msg.guild.prefix}Google - Search Google for something\n`
			,false)
			embed.addField("Admin Commands",
			'To use the Admin Commands you need the **Bot Commander** role\n' +
			`${msg.guild.prefix}Ban - Bans the user mention\n` +
			`${msg.guild.prefix}Kick - Kicks the user mentioned\n`
			,false)
			msg.author.sendEmbed(
 			 embed,
 		 	{ disableEveryone: true }
			); 
			msg.reply(`Please check your DMs for commands`)
			console.log(msg.author.username, msg.author.id, "Help")
				}
		}


	funcs.ping = {
	"usage" : "$$ping",
	"description" : "Guess what - PONG!!",
	"process" : function(bot,msg) {
		var start = process.hrtime();
					var diff = Math.round(process.hrtime(start)[1]/1000);
					msg.channel.sendMessage( "Pong `"+diff+"ms`");
			console.log(msg.author.username, msg.author.id, "Ping")

	}
	}
		funcs.userinfo = {
			"usage": "$$userinfo or $$userinfo @user",
			"description": "See your or others infos",
			"process": function(bot,msg){
				var user = msg.mentions.users.first() || msg.author;
	var guildMem = msg.guild.members.get(user.id);
      var embed = new Discord.RichEmbed()
  embed.setTitle(`Userinfo`)
  .setDescription(`This is what i found about ${user.username}`, false)
  .setColor(16711680)
  .addField('Username', `${user.username}`, true)
  .addField('Nickname', `${guildMem.nickname || "None"}`, true)
  .addField('User ID', `${user.id}`, true);
  embed.addField('Discrim', `${user.discriminator}`,true)
  .addField('Join date', `${guildMem.joinedAt}`,true)
  embed.addField('Account created', `${user.createdAt}`, true)
			    if(user.avatarURL == null){
				embed.addField("Avater", "None", true)
			    }else{
				    embed.setThumbnail(`${user.avatarURL}`, true)
			    }
msg.channel.sendEmbed(
  embed,
  { disableEveryone: true }
);   }}

funcs.rip = {
	"usage" : "$$Rip what ever",
	"description" : "gets ripme website",
	"process" : function(bot,msg){
        var inpUt1 = encodeURI(msg.content.split(" ").splice(1).join(" "))
        msg.channel.sendMessage( "https://www.ripme.xyz/" + inpUt1)
        console.log(msg.author.username, msg.author.id, "Rip")


	}
}
funcs.stats = {
	"usage" : "$$stats",
	"description" : "Gets stats of the bot",
	"process" : function(bot,msg){
        var embed = new Discord.RichEmbed()
	embed.setTitle("JuiceBot stats:");
	embed.setColor(6619135)
	embed.addField("Servers", `${bot.guilds.size}`, true)
        embed.addField("Users", `${bot.users.size}`,true)
        embed.addField("Version", `${config.version}`, true)
	embed.addField("Framework", 'NodeJS', true)
        embed.addField("Library", "discord.js", true)
        embed.addField("Developer", '<@!145749360515219456>', true)
	    embed.setTimestamp()
	    embed.setFooter(`Average Users per Server: ${Math.round(bot.users.size / bot.guilds.size)}`)    
	msg.channel.sendEmbed(
  embed,
  { disableEveryone: true }
);
        console.log(msg.author.username, msg.author.id, "Stats")


}}
funcs.cowsay = {
	"usage" : "cowsay <text>",
	"description" : "makes a cow say things",
	"process" : function(bot,msg,cowsay) {
		var cowsay = require("cowsay");
		msg.channel.sendMessage("```\n"+
	`${cowsay.say({
		text: msg.content.split(" ").splice(1).join(" "),
		e: "0o",
		T: "U"
	})}\n`+
	"```")
	console.log(msg.author.username, msg.author.id, "cowsay")
	}
	}
	funcs.ascii = {
		"usage" : "ascii <text>",
		"description" : "turns text into ascii art",
		"process" : function(bot,msg,figlet){
			var figlet = require('figlet');
			var dinfo1 = msg.content.split(" ").splice(1).join(" ")
			figlet(dinfo1, function(err, data) {
			    if (err) {
			        console.log('Something went wrong...');
			        console.dir(err);
			        return;
			    }
			    msg.channel.sendMessage(
						"```\n" +
					`${data}\n` +
				"```")
				console.log(msg.author.username, msg.author.id, "ascii")
			});
		}
	}

funcs.urban = {
	"usage" : "<prefix>urban <term>",
	"description" : "Search urban dictionary for a term",
	"process" : function(bot,msg,urban){
		var urban = require('urban');
		var term = msg.content.split(" ").splice(1).join(" ")
		var uterm = urban(term)
		var embed = new Discord.RichEmbed()
		uterm.first(function(json){
		if(json == null){
		embed.setTitle("Urban Dictionary results:")
		.setColor(16711680)
		.addField("Term", `${term}`, true)
		.addField("Error", 'Term not found',true)
		msg.channel.sendEmbed(
		embed,
		{disableEveryone: true});
		}else{
		embed.setTitle("Urban Dictionary results: ")
		.setColor(65280)
		embed.addField("Term searched",`${term}`,true)
		embed.addField("Result", `${json.definition}`, false)
		msg.channel.sendEmbed(
		embed,
		{disableEveryone: true});
}
}
		
)}
}
	module.exports = funcs;
