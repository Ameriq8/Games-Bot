const { MessageEmbed } = require('discord.js');
const Coins = require("../../models/userModel");
const cm = require('comma-number');

module.exports = {
  name: "leaderboard",
  aliases: ["lb", "leader"],
  permissions: [],
  ownerOnly: false,
  enabled: true,
  cooldown: 5,
  exec: async (client, message, args) => {
     let size = await Coins.find().size
     
    Coins.find().sort([
      ['coins', 'descending']
    ]).exec((err, res) => {
      if (err) console.log(err);
        let i = null;
      
      let f = []
      let e = []
      let leaderboardTitle = await client.i18n.get(message.guild.language, "commands", "leaderboard_title");
      
      let embed = new MessageEmbed()
        .setAuthor(`${leaderboardTitle}`, client.user.displayAvatarURL({dynamic:true}))
      .setThumbnail(client.user.displayAvatarURL({ dynamic:true }))
     .setColor("#D3D3D3");
        for (i = 0; i < 10; i++) {
          let member = client.users.cache.filter(sss => sss.id == res[i].userID).find(user => user.id == res[i].userID) ? client.users.cache.filter(sss => sss.id == res[i].userID).find(user => user.id == res[i].userID).tag : res[i].userName 
          let memberID = client.users.cache.filter(sss => sss.id == res[i].userID).find(user => user.id == res[i].userID) ? client.users.cache.filter(sss => sss.id == res[i].userID).find(user => user.id == res[i].userID).id : res[i].userID
          if (member === res[i].userName) {
            let all = (memberID == message.author.id) ? ` [${member}] | ${cm(res[i].coins)}` : `${member} | ${cm(res[i].coins)}`
         f.push(`${i + 1} ${all}`)
         // embed.addField(`*\`#\`* ${i + 1} | __${member}__`, `**\`&\`** **Coins**: \` ${res[i].coins} \``);
          } else {
            
            let all = (memberID == message.author.id) ? ` [${member}] | ${cm(res[i].coins)}` : `${member} | ${cm(res[i].coins)}`
         f.push(`${i + 1} ${all}`)
            // embed.addField((res[i].userID == message.author.id) ? ('d', 'd') : (`*\`#\`* ${i + 1} | __${member.tag}__`, `**\`&\`** **Coins**: \` ${res[i].coins} \``));
          }
        }
      
      embed.setDescription(`\`\`\`ini\n ${f.join('\n\n')} \`\`\` `)
      
message.channel.send(embed);

  }
    )

  }
}