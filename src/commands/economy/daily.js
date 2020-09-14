const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const Coins = require('../../database/user')
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('daily', 'testing', ["work"]);
  }

  async run(client, message, args) {
// let amount = funcs.generateInt(45, 45); 

    await Coins.findOne({ userID: message.author.id},(err,data) => {
        let amount = Math.floor(Math.random() * 300) + 100;
        if(data._time !== null && 21600000 - (Date.now() - data._time) > 0){

        //if(data._time !== null && 86400000 - (Date.now() - data._time) > 0){
          let embed = new MessageEmbed()
          .setTitle(`Waiting..`)
          .setDescription(`> **You can take you'r daily after *\` ${ms(21600000 - (Date.now() - data._time ))} \`*. **`)
    message.channel.send(embed)
        } else {
        data._time = Date.now()
        data.coins += parseInt(amount)
        data.save()
        let a = new MessageEmbed()
        .setAuthor(`You daily has been given `, message.author.displayAvatarURL())
        .setDescription(`**You've collected your daily reward of *\` ${amount} \`* coins.**`)
        .setColor(`#D3D3D3`)
        message.channel.send(a)
      }
    })

  }}