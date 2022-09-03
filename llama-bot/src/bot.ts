import Discord, { Client, IntentsBitField, Partials } from "discord.js";
import AppConfig from "./config";
import { ListenerCtr } from "./listeners/listener";

class LlamaBot {
  private readonly client: Client;

  constructor() {
    this.client = this.initClient();
  }

  start(): void {
    this.client.login(AppConfig.discordToken);
  }

  destroy(): void {
    this.client.destroy();
  }

  registerListeners(...listenerCtrs: ListenerCtr[]): void {
    listenerCtrs
      .map((listenerCtr) => new listenerCtr())
      .forEach((listener) => {
        if (listener.once) {
          this.client.once(listener.event, listener.handler);
        } else {
          this.client.on(listener.event, listener.handler);
        }
      });
  }

  private initClient(): Client {
    return new Discord.Client({
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
        new IntentsBitField(32767),
        IntentsBitField.Flags.MessageContent,
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
}

export default (): LlamaBot => new LlamaBot();
