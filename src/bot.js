const { Client } = require("discord.js");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const f = require("./cooldown");
const { registerCommands, registerEvents } = require("./utils/registry");
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.db = require("quick.db");
  await mongoose
    .connect(
      "",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .catch(err => console.log(err));
  // client.test = require('./webhook/weebhook.js')
  // client.logger = require('./webhook/loger')
  client.Error = require("./webhook/Error");
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();