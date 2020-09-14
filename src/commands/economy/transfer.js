const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Coins = require("../../database/coins");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("transfer", "testing", ["pay"]);
  }

  async run(client, message, args) {
    let member = message.guild.member(message.mentions.users.first());
    if (!member)
      return message.reply(`Please mention someone`);
    if (!args[1])
      return message.reply(`Please Type Amount`);
    if (args[1] < 1)
      return message.reply(
        `You can't transfer 1 coins`
      );
    if (isNaN(args[1]))
      return message.reply(`Type only numbers`);
    Coins.findOne({ userID: message.author.id }, (err, loc) => {
      Coins.findOne({ userID: member.id }, (err, data) => {
        if (!data) {
          let errorMess = new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `I can't find **${member.user.tag}** in my database`
            );
          return message.channel.send(errorMess);
        } else {
          if (loc.coins < Number(args[1])) return message.reply(`<You can't transfer this amount`);
          if (loc.userID == member.id)
            return message.reply(`!`);
          if (member.user.bot) return message.reply(`You can't transfer to bots`);
        let first = Math.floor(Math.random() * 9);
        let second = Math.floor(Math.random() * 9);
        let third = Math.floor(Math.random() * 9);
        let fourth = Math.floor(Math.random() * 9);
        let num = `${first}${second}${third}${fourth}`;

          let embeds = new MessageEmbed()
          .setTitle(`Confirm the transfer`)
          .setDescription(`**Type this number to confirm the transfer\nCode: ${num}**`)
          .setColor(`#D3D3D3`)
          .setFooter(`© ${client.user.username}, All Rights Reserved 2020`, client.user.avatarURL())
          message.channel.send(embeds).then(msg => {
          message.channel.awaitMessages(r => r.author.id === message.author.id, {max:1 ,time: 20000,errors: ["time"]}) .then(collected => {
          
          if (collected.first().content === num) {
          let embed = new MessageEmbed()

            .setColor("#D3D3D3")
            .setDescription(`**${message.author.username} transfer \` ${args[1]} \` to ${member.user.username} **`);
          loc.coins -= Math.floor(parseInt(args[1]));
          data.coins += Math.floor(parseInt(args[1]));
          loc.save()
          data.save();
          message.channel.send(embed);
} else {
  return message.channel.send(`Ivild Code`)
}
   })
          })

        }

      });
    });
  }
};
