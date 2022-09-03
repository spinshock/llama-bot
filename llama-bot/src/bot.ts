import Discord, {
  Client,
  IntentsBitField,
  Interaction,
  Partials,
} from "discord.js";
import { CommandMap, CommandName } from "./commands/command";
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

  registerCommands(commands: CommandMap): void {
    this.client.on("interactionCreate", async (interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (this.isValidCommandName(interaction.commandName)) {
        commands[interaction.commandName].handler(interaction);
      }
    });
  }

  private isValidCommandName(commandName: string): commandName is CommandName {
    return Object.values(CommandName).includes(commandName as CommandName);
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
