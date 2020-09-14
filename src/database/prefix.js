const mongoose = require("mongoose");

const prefixSchema = mongoose.Schema({
    ServerId: String,
    prefix: String,
    By:{
        UserTag: String,
        UserId: String 
    },
    Date: String
});

module.exports = mongoose.model("prefixes", prefixSchema)