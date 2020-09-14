const BaseEvent = require("../../utils/structures/BaseEvent");
const db = require("quick.db");
const prefixData = require('../../database/prefix')
module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {

    if(message.author.bot) return;

    prefixData.findOne(
      {
        ServerId: message.guild.id,
      },
      (err, sprefix) => {
//if is an Error its provided in the console
        if (err) console.log(err);
//base of embed
        let prefix;
//if user is not in the data base 
        if (!sprefix) {
       let prefix = "!"
       if (message.author.bot) return;
       if (message.content.startsWith(prefix)) {
         const [cmdName, ...cmdArgs] = message.content
           .slice(prefix.length)
           .trim()
           .split(/\s+/);
         const command = client.commands.get(cmdName);
         if (command) {
           command.run(client, message, cmdArgs);
         }
       }
        } 
//if its in the data base, its provided his coins in the embed
        else {
          let prefix = sprefix.prefix
          if (message.author.bot) return;
          if (message.content.startsWith(prefix)) {
            const [cmdName, ...cmdArgs] = message.content
              .slice(prefix.length)
              .trim()
              .split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
              command.run(client, message, cmdArgs);
            }
          }
        }})









   
  }
};
