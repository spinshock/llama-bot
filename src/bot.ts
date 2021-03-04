import * as Discord from 'discord.js';
import fetch from 'node-fetch';
import * as credentials from '../cred.json';
import { TTVEmoteMap } from './model/ttv-emote-map.model';
import { TTVEmotesRes } from './model/twitchemotes.model';
import { TTVClient } from './ttv/ttv.client';

const ttvClient = new TTVClient(credentials.ttv_client_id, credentials.ttv_client_secret);

let emotesUrl = '//cdn.betterttv.net/emote/{{id}}/{{image}}';

const discordClient = new Discord.Client();

let ttvEmotes = new Map<string, string>();

const addEmotes = (emotes: TTVEmoteMap): void => {
  Object.keys(emotes).forEach((emoteCode) => {
    let code = emoteCode;
    let counter = 0;
    while (ttvEmotes.has(code)) {
      code+= ++counter;
    }
    ttvEmotes.set(code, emotes[code]);
  });
};

discordClient.on('ready', async () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
  addEmotes(await getBTTVDefaultEmotes());
  addEmotes(await getBTTVTopEmotes(1000));
  addEmotes(await getBTTVEmotesFromChannels('forsen'));
  addEmotes(await getBTTVEmotesFromChannels('lirik'));
  addEmotes(await getBTTVEmotesFromChannels('yassuo'));
  addEmotes(await getBTTVEmotesFromChannels('shroud'));
  addEmotes(await getBTTVEmotesFromChannels('sodapoppin'));
  addEmotes(await getTwitchEmotesFromChannels(['lirik', 'forsen', 'yassuo', 'Nmplol']));
  console.log('Loaded emotes:');
  
  ttvEmotes
    .forEach(
      (url, code) => {
        console.log(`[${code}]`)
      }
    );
});

discordClient.on('message', (msg) => {
  if (msg.author.bot) {
    return;
  }
  try {
    const url = ttvEmotes.get(msg.content);
    if (url) {
      // const attachment = new Discord.MessageEmbed({image: { url }});
      msg.channel.send(url);
    }
  } catch(err) {
    msg.reply(err.toString());
  }
});

discordClient.on('message', (msg) => {
  if (msg.author.bot) {
    return;
  }
  try {
    
  } catch(err) {

  }
});

discordClient.login(credentials.token);

const getTwitchEmotesFromChannels = (channels: string[]): Promise<TTVEmoteMap> => {
  return ttvClient.getChannelId(...channels).then((ids) => {
    return ttvClient.getEmotesForChannelIds(ids)
  });
}




const getBTTVEmotesFromChannels = async (channel: string): Promise<TTVEmoteMap> => {
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

const getBTTVTopEmotes = async (maxOffset: number, offset = 0, emotes: { id: string, code: string }[] = []): Promise<TTVEmoteMap> => {
  const fetchedEmotes =  await fetch(`https://api.betterttv.net/3/emotes/shared/top?offset=${offset}&limit=100`)
  .then((res) => res.json() as Promise<{ emote: { id: string, code: string } }[]>)
  .then((emotes) => emotes.map((emote) => emote.emote));
  
  if (offset <= maxOffset && fetchedEmotes.length) {
    return getBTTVTopEmotes(maxOffset, offset + 100, [...emotes, ...fetchedEmotes]);
  } else {
    
    return [...emotes, ...fetchedEmotes].reduce((accEmotes, {
            id,
            code,
          }) => {
            const url = `https:${emotesUrl.replace('{{id}}', id).replace('{{image}}', '3x')}`;
            return {...accEmotes, [code]: url }
          }, {}) as TTVEmoteMap;;
  }
  
}