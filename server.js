const Discord = require('discord.js');
const client = new Discord.Client();
const translate = require('google-translate-api');

client.on('ready', () => {
  console.log('I am ready!');
});

const prefix = '>';

const flags = {
    "en" : ":flag_gb:",
    "ja" : ":flag_jp:"
}

const flagEmojis = {
    "🇫🇷" : "fr",
    "🇺🇸" : "en",
    "🇬🇧" : "en",
    "🇩🇪" : "de",
    "🇯🇵" : "jp",
    "🇪🇸" : "es",
    "🇮🇹" : "it",
    "🇷🇺" : "ru"
}

client.on('message', message => {
    var content = message.content;

    var user = message.channel.lastMessage.author;

    //If it is >(+command) or a flag emoji
    if(content.length >= prefix.length && content.substr(0, prefix.length) == prefix || content.length >= 4 && content.substr(0,4) in flagEmojis) {

        var usedEmoji = content.length >= 4 && content.substr(0,4) in flagEmojis;

        var args = content.substr(prefix.length).split(" ");
        var command = usedEmoji ? flagEmojis[content.substr(0,4)] : args[0].toLowerCase();
        var contentText = content.substr(prefix.length + args[0].length);
        var authorMention = "<@" + message.author.id + ">";

        switch (command) {
            case "fr":
                translateTo('fr', contentText, user, message.channel);
                break;
            case "en":
                translateTo('en', contentText, user, message.channel);
                break;
            case "de":
                translateTo('de', contentText, user, message.channel);
                break;
            case "es":
                translateTo('es', contentText, user, message.channel);
                break;
            case "jp":
                translateTo('ja', contentText, user, message.channel);
                break;
            case "it":
                translateTo('it', contentText, user, message.channel);
                break;
            case "ru":
                translateTo('ru', contentText, user, message.channel);
                break;
            case "help":
                message.channel.send("Supported languages : " + Object.keys(flagEmojis))
        }

    }
});

function translateTo(language, content, user, channel) {

    var userId = user.id;
    var userName = user.username;
    var userAvatar = user.avatar;

    var flagToName = flags[language] == undefined ? ":flag_" + language + ":" : flags[language];

    translate(content, {to: language}).then(res => {
        var iconUrl = userAvatar != null ? "https://cdn.discordapp.com/avatars/"+userId+"/"+ userAvatar +".png" : null;
        if(res.from.language.iso != language) {

            var flagFromName = flags[res.from.language.iso] == undefined ? ":flag_" + res.from.language.iso + ":" : flags[res.from.language.iso];
            const embed = {
                "description": res.text + "\n" + flagFromName + " :loudspeaker: " + flagToName,
                "color": 3000000,
                "author": {
                    "name": userName,
                    "icon_url": iconUrl
                }
            };
            channel.send({embed});
        }

    }).catch(err => {
        console.error(err);
    });
}

client.login('BOT TOKEN GOES HERE');
