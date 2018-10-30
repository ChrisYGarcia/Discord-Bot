const Discord = require("discord.js");

const fs = require("fs");
let userData = JSON.parse(fs.readFileSync("./userData.json", "utf8"));
const prefix = "!";
const TOKEN = require("./config/token");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("ready", () => {
  console.log("I am ready!");
});

bot.on("message", message => {
  if (message.channel.id === "466408655286304768") {
    if (message.author.bot) return;

    if (!userData[message.author.id])
      userData[message.author.id] = {
        points: 0,
        level: 0
      };

    userData[message.author.id].points++;
    let userPoints = userData[message.author.id]
      ? userData[message.author.id].points
      : 0;

    // And then, we save the edited file.
    fs.writeFile("./userData.json", JSON.stringify(userData), err => {
      if (err) console.error(err);
    });

    message.channel.send(
      `:HappySpeech: Congrats ${
        message.author
      }! You get 1 gold star! You now have [${userPoints}] gold stars! :HappySpeech:`
    );
    //:HappySpeech:
  }

  /* //let msg = message.content.toLowerCase();

    if(message.content === prefix + 'nsa') {
    
        message.channel.send('The 2019 National Stuttering Conference is going to be in Fort Lauderdale, Florida!');
    } */

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "nsa") {
    message.channel.send("Worked");
  }

  let description = "";
  let type = "";
  let date = "";
  for (var i = 2; i <= args.length - 1; i++) {
    description += args[i] + " ";
  }

  if (command === "add") {
    type = args[0]; // Remember arrays are 0-based!.
    date = args[1];

    message.reply(
      `Hello ${
        message.author.username
      }, on ${date}, there will be a ${type} for ${description}`
    );
  }

  if (command === `${args[0]}`) {
    message.reply(` ${args[1]}`);
    message.reply(` ${description}`);
  }
});

bot.login(TOKEN);
