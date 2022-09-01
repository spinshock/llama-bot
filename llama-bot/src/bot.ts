import Discord, { Client, IntentsBitField, Partials } from "discord.js";
import { ListenerCtr } from "./listeners/listener";

class LlamaBot {
  private readonly client: Client;

  constructor(private readonly token: string) {
    this.client = this.initClient();
  }

  start(): void {
    this.client.login(this.token);
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
      intents: [new IntentsBitField(32767)],
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

export default (token: string): LlamaBot => new LlamaBot(token);
