import { Awaitable, Client } from "discord.js";
import { BaseListener } from "./listener";

export class StartupListener extends BaseListener<"ready"> {
  constructor() {
    super("ready");
  }

  handler(client: Client<true>): Awaitable<void> {
    console.log("Llama ready");
    console.log(`${client.user.username} is online`);
  }
}
