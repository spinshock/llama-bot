import Discord, { Client, IntentsBitField, Partials } from "discord.js";
import { DiscordBot } from "./decorators/bot";

@DiscordBot()
export class LlamaBot {
  private readonly client: Client;

  constructor(private readonly token: string) {
    this.client = new Discord.Client({
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent,
      ],
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.DirectMessageTyping,
      ],
      presence: {
        status: "online",
        activities: [
          {
            name: "https://llama-bot-discord.com/",
          },
        ],
      },
    });
  }

  start(): void {
    this.client.login(this.token);
  }

  destroy(): void {
    this.client.destroy();
  }

  registerListeners(): void {
    this.client.on("messageCreate", (_msg) => {
      console.log(this.client.emojis.cache.map((emoji) => emoji.name));

      // this.client.emojis.cache.forEach((emoji) => msg.react(emoji));
    });
  }
}
