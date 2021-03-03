import * as Discord from 'discord.js';
import fetch from 'node-fetch';
import * as credentials from '../cred.json';
import { TTVEmoteMap } from './model/ttv-emote-map.model';
import { TTVEmotesRes } from './model/twitchemotes.model';
import { TTVClient } from './ttv/ttv.client';

const ttvClient = new TTVClient(credentials.ttv_client_id, credentials.ttv_client_secret);

const getTwitchEmotesFromChannels = (channels: string[]): Promise<TTVEmoteMap> => {
  return ttvClient.getChannelId(...channels).then((ids) => {
    return ttvClient.getEmotesForChannelIds(ids)
  });
}




const getBTTVEmotes = async (channel: string): Promise<TTVEmoteMap> => {
  return await fetch(`https://api.betterttv.net/2/channels/${channel}?limit=100`)
  .then((res) => res.json())
  .then(({ emotes }: { emotes: TTVEmotesRes[] }) => {
    if (emotes) {
      return emotes.reduce((accEmotes, {
        id,
        code,
      }) => {
        const url = `https:${emotesUrl.replace('{{id}}', id).replace('{{image}}', '3x')}`;
        return {...accEmotes, [code]: url }
      }, {}) as TTVEmoteMap;
    }
  });
}

const getBTTVDefaultEmotes = async (): Promise<TTVEmoteMap> => {
  return await fetch(`https://api.betterttv.net/2/emotes?limit=100`)
  .then((res) => res.json())
  .then(({ emotes }: { emotes: TTVEmotesRes[] }) => {
    if (emotes) {
      return emotes.reduce((accEmotes, {
        id,
        code,
      }) => {
        const url = `https:${emotesUrl.replace('{{id}}', id).replace('{{image}}', '3x')}`;
        return {...accEmotes, [code]: url }
      }, {}) as TTVEmoteMap;
    }
  });
}

const client = new Discord.Client();

let ttvEmotes: TTVEmoteMap;
let emotesUrl = '//cdn.betterttv.net/emote/{{id}}/{{image}}';

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
    ttvEmotes = {
      ...ttvEmotes, 
      ...(await getBTTVEmotes('forsen')),
      ...(await getBTTVEmotes('lirik')),
      ...(await getBTTVEmotes('yassuo')),
      ...(await getBTTVDefaultEmotes()),
      ...(await getTwitchEmotesFromChannels(['lirik', 'forsen'])),
    }
    
  console.log('Loaded emotes:');
  
  Object.keys(ttvEmotes)
    .forEach(
      (emote) => {
        console.log(`[${emote}]`)
      }
    );
});

client.on('message', (msg) => {
  if (msg.author.bot) {
    return;
  }
  try {
    const url = ttvEmotes[msg.content];
    if (url) {
      const attachment = new Discord.MessageEmbed({image: { url }});
      msg.channel.send(attachment);
    }
  } catch(err) {
    msg.reply(err.toString());
  }
});

client.login(credentials.token);