const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const prefixData = require('../../database/prefix')
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('setprefix', 'testing', []);
  }

  async run(client, message) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Sorry you don't have permission")

    const args = message.content.split(' ').slice(1).join(' ')

  if(message.author.bot) return;
  if(!args) return message.reply(`Provided something`)
  prefixData.findOne({
    ServerId: message.guild.id,
  }, (err, prefix) => {
     if(err) console.log(err)
     if(!prefix){
        const newPrefix= new prefixData({
              ServerId: message.guild.id,
              prefix: args,
              By:{
                  UserTag: message.author.tag,
                  UserId: message.author.id
              },
              Date: Date()
          })
          newPrefix.save().catch(err => console.log(err))

     } else {
      prefix.prefix = args
      prefix.By.UserTag = message.author.tag
       prefix.By.UserId = message.author.id
       prefix.save().catch(err => console.log(err))
     }

  })
  message.channel.send(`Done set prefix to ${args}`)

  }
}