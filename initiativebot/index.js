// Load up the discord.js library
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require('enmap');

// Create client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

// Adds the event handler files from the ./events directory.
console.log('Adding event handler files...');
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

// Adds the commands from the ./commands directory.
console.log('Adding command files...');
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

// Login!!
client.login(config.token);
