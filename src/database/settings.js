const mongoose = require("mongoose");

const Settings = mongoose.Schema({
  
  // Server Database
  
  guildID: String,
  guildName: String,
  prefix: String,
  
  // Leveling Database
  
  level: {
  lvlChannel: String,
  lvlMessage: String,
  }
  
});

module.exports = mongoose.model("Settings", Settings);
