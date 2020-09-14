const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const Coins = require('../../database/user')
const cm = require('comma-number');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('leader', 'testing', ["leaderboard", "lb"]);
  }

  async run(client, message, args) {

    //Grab all of the users in said server
    Coins.find().sort([
      ['coins', 'descending']
    ]).exec((err, res) => {
      if (err) console.log(err);
        let i = null;
      let embed = new MessageEmbed()
        .setAuthor(`Coins Leaderboard`, client.user.displayAvatarURL({dynamic:true}))
      .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
      //if there are no results
      if (res.length === 0) {
        embed.setColor("RED");
        embed.addField("No data found", "Please type in chat to gain coins!")
      } else if (res.length < 5) {
        //less than 10 results
        embed.setColor("#D3D3D3");
        for (i = 0; i < res.length; i++) {
            let member = client.users.cache.find(user => user.id == res[i].userID) || res[i].UserName
            if (member === res[i].UserName) {
            embed.addField(`*\`#\`* ${i + 1} | __${member}__`, `**\`&\`** **Coins**: \` ${cm(res[i].coins)} \``);
          } else {
            embed.addField(`*\`#\`* ${i + 1} | __${member.tag}__`, `**\`&\`** **Coins**: \` ${cm(res[i].coins)} \``);
          }
        }
      } else {
        //more than 10 results
        embed.setColor("#D3D3D3");
        for (i = 0; i < 5; i++) {
          let member = client.users.cache.filter(sss => sss.id == res[i].userID).find(user => user.id == res[i].userID) || res[i].UserName
          if (member === res[i].UserName) {
            embed.addField(`*\`#\`* ${i + 1} | __${member}__`, `**\`&\`** **Coins**: \` ${cm(res[i].coins)} \``);
          } else {
            embed.addField(`*\`#\`* ${i + 1} | __${member.tag}__`, `**\`&\`** **Coins**: \` ${cm(res[i].coins)} \``);
          }
        }
      }
  
      message.channel.send(embed);
  }
    )}}