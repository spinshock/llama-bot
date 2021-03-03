import Discord from 'discord.js';
import * as credentials from './cred.json';
const client = new Discord.Client();

let ttvEmotes = {};
let emotesUrl = '';
fetch('https://api.betterttv.net/2/emotes').then((res) => res.json()).then(({urlTemplate, emotes}) => {
    emotesUrl = urlTemplate;
    ttvEmotes = emotes.reduce(({
        id,
        channel,
        code,
        imageType
    }, accEmotes) => {
        return {...accEmotes, [id]: {code, channel, imageType}}
    }, {})
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(credentials.token);