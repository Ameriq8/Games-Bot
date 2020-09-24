const { Client } = require("discord.js");
const { I18n } = require("locale-parser");
const Mongoose = require("mongoose");
const client = new Client();
client.config = require("./config.json");
client.i18n = new I18n({ defaultLocale: "ar" });
Mongoose.connect(client.config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.database = Mongoose.connection;
client.database.on("error", (err) => {
    throw err;
});
client.database.once("open", async () => {
    require("./models");
    require("./handlers/eventHandler")(client);
    require("./handlers/moduleHandler")(client);
    client.login(client.config.bot_token);
});