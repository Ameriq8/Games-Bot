const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Money = require("../../database/coins");
const cm = require('comma-number');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("coins", "testing", ['bal', 'money', 'credits']);
  }

  async run(client, message, args) {
    const f = await Money.find().count()

    const user = message.mentions.users.first() || client.users.cache.find(user => user.id == args || user.tag == args) || message.author;

    Money.findOne(
      {
        userID: user.id,
      },
      (err, money) => {
        
        if (err) console.log(err);
        let embed = new MessageEmbed()
          .setAuthor(`${user.username} Coins`, user.displayAvatarURL({ dynamic: true }))
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setFooter(`Request By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          .setColor("#FFFFFF")
          .addField("Coins: ", cm(money.eco.coins), true)
          .addField("Bank: ", cm(money.bank.bankCoins))
          .addField("Total Tax: ", cm(money.eco.totalTax));
         message.channel.send(embed);
        
      })
  }
};