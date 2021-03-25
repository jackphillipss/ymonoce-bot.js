const Discord = require('discord.js'); // retrieve discord.js module
const client = new Discord.Client(); // define discord.client() as client
const config = require('./config.json'); // retreive config
const token = config.token; // retrieve token
const prefix = config.prefix; // retrieve prefix
const fs = require('fs'); //retrieves fs module
const mongoose = require('mongoose');
const mongoDBURL = require('./config.json').mongoDBURL;

mongoose
  .connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(console.log('Connected to MongoDB Database'))

client.commands = new Discord.Collection() // create commands collection
client.aliases = new Discord.Collection() // create aliases collection
client.categories = fs.readdirSync("./commands/");

module.exports = client;
["handler"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
})

client.login(token);