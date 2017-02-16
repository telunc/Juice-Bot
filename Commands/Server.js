const funcs = {};
const Discord = require("discord.js")
const embed = new Discord.RichEmbed()
    funcs.prune = {
      "usage" : "$$prune",
      "description" : "Prunes messages",
      "process" : function(bot,msg,ownerid){
          if (msg.author.bot) return;
            let params = msg.content.split(" ").slice(1);
              let messagecount = parseInt(params[0]);
                let reqrank = msg.member.roles.exists('name', 'Bot Commander');
                  let gbot = msg.guild.member(bot.user);
                    let OwnerID = ownerid
                      if (reqrank != '' || msg.author.id == OwnerID) {
                        if (gbot.hasPermission('ADMINISTRATOR') || gbot.hasPermission('MANAGE_MESSAGES')) {
                          if (messagecount > 0 && messagecount < 101) {
                            msg.channel.fetchMessages({limit: messagecount})
                            .then(messages => msg.channel.bulkDelete(messages));
                            msg.channel.sendMessage(messagecount + " messages have been deleted!");
                          }
                          else if (messagecount == 0) {
                            msg.channel.sendMessage(mc + " I can't delete 0 messages!");
                          }
                          else {
                            msg.channel.sendMessage(msg.author + " That's not a number between 1 and 100!");
                          }
                        }
                        else {
                          msg.channel.sendMessage(msg.author + " I don't have permission to prune here!");
                        }
                      }
                      else {
                        msg.channel.sendMessage(msg.author + " You don't have the `Bot Commander` role! :no_entry_sign:");
                      }
                    }
                  }
	funcs.server = {
		"usage" : "<prefix>server",
		"description" : "Gets info about the guild",
		"process" : function(bot,msg){
var embed = new Discord.RichEmbed()
  embed.setTitle(`${msg.guild.name}`)
  .setDescription(`This is what i found about ${msg.guild.name}`, false)
  .setColor(51455)
  .addField('Guild name', `${msg.guild.name}`, true)
  .addField('Guild ID', `${msg.guild.id}`, true)
  .addField('Members', `${msg.guild.members.size}`, true);
  embed.addField('Region', `${msg.guild.region}`,true)
  .addField('Owner', `${msg.guild.owner}`,true)
  .addField('Guild created', `${msg.guild.createdAt}`, true)
		    if(msg.guild.iconURL == null){
			embed.addField("Server icon","No server icon", true)
		    }else{
  embed.setImage(`${msg.guild.iconURL}`, false)
		    }

msg.channel.sendEmbed(
  embed,
  { disableEveryone: true }
); 
		}
	}
	funcs.setprefix = {
		"usage" : "<prefix>setprefix <new prefix>",
		"description" : "change the prefix on the server",
		"process" : function(bot,msg,fs,ownerid){
		    let OwnerID = ownerid
		    
		    if (msg.guild.roles.exists("name", "Bot Commander")|| msg.author.id === OwnerID) {
                   		 if (msg.member.roles.exists("name", "Bot Commander")|| msg.author.id === OwnerID){
				     var newPrefix = msg.content.replace(`${msg.guild.prefix}setprefix `, "")
				     if(newPrefix.length > 4){
					 msg.reply(':no_entry_sign: Sorry prefix cant be longer than 4 characters :no_entry_sign:')
				     }else{
				msg.guild.setPrefix(newPrefix)
					msg.reply(`Set server prefix to ${msg.content.split(" ").splice(1).join(" ")}`)
				console.log(`${msg.guild} set prefix to ${msg.content.split(" ").splice(1).join(" ")}`);
         			     }
				 }else{
     		 msg.reply("You dont have the Bot Commander role!");
      			   }}else{
      				msg.reply("Bot Commander role doesnt exist");
      			   }
		}
	}	
funcs.discrim = {
    'usage': 'Get a discrim',
    'description': 'Find a discrim',
    'process': function(bot, msg) {
        var discrim = msg.content.split(" ").splice(1).join(" ")
        if (discrim.length > 4 || discrim.length < 4) {
            msg.reply('Invalid discriminator');
        } else {
	var embed = new Discord.RichEmbed()
            var users = bot.users.findAll(`discriminator`, discrim).map(user =>`${user.username}#${user.discriminator}  `);

            if (users.length === 0) {
                msg.channel.sendMessage(`I couldnt find any users with that discriminator`);
                                                                
            } else {                                                            
msg.reply(`i found ${users.length} with that discrim: ${users}`);                
            }                                                                   
        }                                                                      
    }                                                                           
}      
                                               

module.exports = funcs;
