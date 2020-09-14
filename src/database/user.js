const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  // Global Data
  userID: String,
  userName: String,

  // Leveling Data
  leveling: {
  guildID: String,
  guildLevel: Number,
  guildXp: Number
  },

  // Economy Data
  eco: {
  coins: Number,
  LeaderBoard: String,
  totalTax: Number,
  _time: Number
  },
  
  // Bank Data
  bank: {
  cardName: String,
  cardType: String,
  cardID: Number,
  cardexpirDate: String,
  bankCoins: Number
  },

  // Games Data
  games: {
  guildID: String,
  guildWins: Number,
  guildLoses: Number,
  guildPoints: Number,
  guildMatchs: Number
  }
  
});

module.exports = mongoose.model("globaluserData", userSchema);