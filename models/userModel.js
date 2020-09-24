const { Schema, model } = require("mongoose");

const userSchema = Schema({
    userID: {
        type: String,
        required: true
    },
    guildID: {
        type: String,
        required: true
    },
    userName: {
    	  type: String,
    	  required: true
    },
    coins: {
    	type: Number,
    	required: true,
    	default: 50
    },
    exp: {
    	type: Number,
    	required: true,
    	default: 0
    },
    level: {
    	type: Number,
    	required: true,
    	default: 1
    },
    totalTax: {
    	type: Number,
    	required: true,
    	default: 0
    },
    daily: {
    	type: Number,
    	required: true,
    	default: 0
    },
    wins: {
    	type: Number,
    	required: true,
    	default: 0
    },
    loses: {
    	type: Number,
    	required: true,
    	default: 0
    },
    matches: {
    	type: Number,
    	required: true,
    	default: 0
    },
    points: {
    	type: Number,
    	required: true,
    	default: 0
    }
}) 

module.exports = model("userModel", userSchema, "USER_COLLECTION");