const Discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [],
    permissions: [],
    enabled: false,
    cooldown: 5,
    exec: async (client, message) => {
     /*   await message.channel.send(client.i18n.get(message.guild.language, "commands", "ping_command", { ping: client.ws.ping }));*/
        
        try {
          let myLatency = await client.i18n.get(message.guild.language, "commands", "ping_mylatency");
          
          let apiLatency = await client.i18n.get(message.guild.language, "commands", "ping_apilatency");
          
      message.channel.send(`Pinging...`).then(async m => {
        let latencyPing = Math.floor(
          m.createdTimestamp - message.createdTimestamp
        );

        m.delete({ timeout: 2000 });
      
      setTimeout(() => {
        let sentence =
          `${myLatency}: ` +
          "`" +
          `${latencyPing}ms` +
          "`" +
          `\n${apiLatency}: ` +
          "`" +
          `${client.ws.ping}ms` +
          "`";
          
        message.channel.send(sentence);
      }, 2500);
      
      });
    } catch (err) {
      console.log(data.cmd.name + " Error:\n" + err);
      return message.channel.send(
        "An error occurred while trying to run this command"
      );
    }
    }
}