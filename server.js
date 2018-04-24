const Discord = require('discord.js');
const client = new Discord.Client();
const translate = require('google-translate-api');

client.on('ready', () => {
  console.log('I am ready!');

});

const prefix = '>';

const flags = {
    "en" : ":flag_gb:",
    "ja" : ":flag_jp:",
    "da" : ":flag_dk:"
}

const flagEmojis = {
    "🇫🇷" : "fr",
    "🇺🇸" : "en",
    "🇬🇧" : "en",
    "🇩🇪" : "de",
    "🇯🇵" : "jp",
    "🇪🇸" : "es",
    "🇮🇹" : "it",
    "🇷🇺" : "ru",
    "🇦🇷" : "ar"
}

client.on('message', message => {
    // console.log(message.content);
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
                translateTo('fr', contentText, user, message);
                break;
            case "gb":
            case "us":
            case "en":
                translateTo('en', contentText, user, message);
                break;
            case "de":
                translateTo('de', contentText, user, message);
                break;
            case "es":
                translateTo('es', contentText, user, message);
                break;
            case "ja":
            case "jp":
                translateTo('ja', contentText, user, message);
                break;
            case "it":
                translateTo('it', contentText, user, message);
                break;
            case "ru":
                translateTo('ru', contentText, user, message);
                break;
            case "ar":
                translateTo('ar', contentText, user, message);
                break;
            case "help":
                message.channel.send("Supported languages : " + Object.keys(flagEmojis))
        }

    }
});

function translateTo(language, content, user, message) {
    var channel = message.channel;
    var userId = user.id;
    var userName = user.username;
    var userAvatar = user.avatar;

    var flagToName = flags[language] == undefined ? ":flag_" + language + ":" : flags[language];

    translate(content, {to: language}).then(res => {
        var iconUrl = userAvatar != null ? "https://cdn.discordapp.com/avatars/"+userId+"/"+ userAvatar +".png" : user.displayAvatarURL;
        var color;

        if(message.member== null) {
            color = 16777215;
        } else {
            color = message.member.roles.keyArray().length != 1 ? message.member.roles.last().color : 16777215;
        }

        if(res.from.language.iso != language) {
            var flagFromName = flags[res.from.language.iso] == undefined ? ":flag_" + res.from.language.iso + ":" : flags[res.from.language.iso];

            const embed = {
                "description": res.text + "\n" + flagFromName + " :loudspeaker: " + flagToName,
                "color": color,
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
