var funcs = {};
 const Discord = require("discord.js")


funcs.kick = {
  "usage" : "$$kick",
  "description" : "kicks user listed",
  "process" : function(bot, msg){
    if(msg.channel.type === 'dm'){
      msg.channel.sendMessage('Cant do that command in dms')
    }

       else {
           if (msg.guild.roles.exists("name", "Bot Commander")) {
               if(msg.mentions.users.array().length !== 0){
                   if (msg.member.roles.exists("name", "Bot Commander")){
                       var GuildMember = msg.guild.members.get( msg.mentions.users.array()[0].id);
                       GuildMember.kick();


                       msg.reply("That user has been kicked");
                       console.log(msg.author.username, msg.author.id, "Kick");
                   }

                   else {
                       msg.reply("You may not have the Bot Commander role, Check if you have role and th\
at role has admin and ban/kick");
                   }}
               else{
                   msg.reply("No user listed");
               }

           }


           else {
               msg.reply("Bot Commander role does not exist. Please make it and try again");
           }
       }
   }
}
funcs.ban = {
  "usage" : "$$ban",
  "description" : "bans user listed",
  "process" : function(bot, msg){
    if(msg.channel.type === 'dm'){
      msg.channel.sendMessage('Cant do that command in dms')
    }
       else {
           if (msg.guild.roles.exists("name", "Bot Commander")) {
               if(msg.mentions.users.array().length !== 0){
                   if (msg.member.roles.exists("name", "Bot Commander")){
                       var GuildMember = msg.guild.members.get(msg.mentions.users.array()[0].id);
                       GuildMember.ban();


                       msg.reply("That user has been banned");
                       console.log(msg.author.username, msg.author.id, "banned");
                   }

                   else {
                       msg.reply("You may not have the Bot Commander role, Check if you have role and th\
at role has admin and ban/kick");
                   }}
               else{
                   msg.reply("No user listed");
               }

           }


           else {
               msg.reply("Bot Commander role does not exist. Please make it and try again");
           }
       }
   }
}
funcs.say = {
	"usage" : "<prefix>say",
	"description" : "says what you say",
	"process" : function(bot,msg,ownerid){
	if (msg.author.id === ownerid) {
	msg.channel.sendMessage(msg.content.split(" ").splice(1).join(" "));
}
	}
}
funcs.embedsay = {
	"usage" : "<prefix>say",
	"description" : "says what you say",
	"process" : function(bot,msg,ownerid){
        var embed = new Discord.RichEmbed()
	if (msg.author.id === ownerid) {
	var content = msg.content.split(" ").splice(1).join(" ")

	embed.setTitle(`${content}`)
        .setColor(11468975)

msg.channel.sendEmbed(
  	embed,
  	{ disableEveryone: true }
	); 
}
}
}
funcs.eval = {
	"usage" : "<prefix>eval",
	"description" : "evaluates code",
	"process" : function(bot,msg,ownerid){
        var embed = new Discord.RichEmbed()
	    if (msg.author.id === ownerid) {
           var code = msg.content.split(" ").splice(1).join(" ")
           if(code.length === 0){
 	   msg.reply('you forgot to add your code :face_palm:')
	   }else{
           try {
             embed.setTitle("Eval results")
             .setColor(65280)
             .addField("Input", `${code}`, true)
             .addField("Result", `${eval(code)}`, false)
           }
           catch (err) {
               embed.setTitle("Eval error")
               .setColor(16711680)
               .addField("Eval error", `${err}`, false)
           }

	msg.channel.sendEmbed(
  	embed,
  	{ disableEveryone: true }
	); 
       }}
       else {
           msg.channel.sendMessage("You do not have permission to use this command")
       }
       console.log("Eval")

		}
	}

  funcs.setstatus = {
    "usage" : "$$setstatus online/idle <game name>",
    "description" : "set game",
    "process" : function(bot, msg,ownerid){
       if (msg.author.id === ownerid){
       var status = msg.content.split(" ").splice(1)[0]
       var game = msg.content.split(" ").splice(2).join(" ")
	var embed = new Discord.RichEmbed()
	try{
	    bot.user.setStatus(status)
	    bot.user.setGame(game)
           embed.setTitle("Status changed")
           .setColor(65280)
           .addField("Status", `${status}`, true)
           .addField("Game", `${game}`, true)
       }
       catch (err) {
           embed.setTitle("Error")
           .setColor(16711680)
           .setDescription("Not permitted to run this command")
       }
msg.channel.sendEmbed(
  	embed,
  	{ disableEveryone: true }
	); 
}
}
    }
funcs.announce = {
	"usage" : "announce things",
	"description" : "announces things to servers",
	"process" : function(bot,msg,ownerid){
		let OwnerId = ownerid
		if(msg.author.id === ownerId){
			bot.guilds.forEach(function(g){
g.channels.forEach(function(c){
if (c.id===g.id){
c.sendMessage(msg.content.split(" ").splice(1).join(" "));
}
});
});
			}else{
	msg.reply('**YOU CANT USE THAT**');
	console.log(msg.author.username,msg.author.id, "Announce fail")
      }}
}








module.exports = funcs;
