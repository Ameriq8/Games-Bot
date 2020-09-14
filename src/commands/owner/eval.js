const BaseCommand = require("../../utils/structures/BaseCommand");
"use strict";

const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("eval", "testing", []);
  }

  async run(client, message) {

    let dev = ["442032295214579712", "508449321176268801"]
    
            //if (message.author.id !== '508449321176268801' || message.author.id !== '442032295214579712') return;
        if (!dev.includes(message.author.id)) return; 
    try {
            const com = eval(message.content.split(" ").slice(1).join(" "));
            message.channel.send('```\n' + com + '```');
        } catch (e) {
            message.channel.send('```javascript\n' + e + '```');
        }
  }
};
