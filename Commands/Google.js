var funcs = {};

funcs.google = {
    "usage":"<prefix>google <anything>",
    "description":"Google something pls",
    "process": function(bot,msg,google,Discord){
        google.resultsPerPage = 1
        var nextCounter = 0
         var embed = new Discord.RichEmbed()
    google(msg.content.split(" ").splice(1).join(" "), function (err, res){
            if(err || link === null){
                embed.setTitle("Google Error")
                embed.setColor(16711680)
                embed.addField("Error", "There was a error processing your request")
            }

            
 
            for (var i = 0; i < res.links.length; ++i) {
                var link = res.links[i];
    embed.setTitle("Google Results");
    embed.setDescription(`You have Googled ${msg.content.split(" ").splice(1).join(" ")}`)
    embed.setColor(65280);
    embed.addField("Result", link.title + ' - ' + link.href,false);
    embed.addField("Description", link.description, false)
 msg.channel.sendEmbed(
  	embed,
  	{ disableEveryone: true }
	);
            }
    })
    }
}






module.exports = funcs;
